use backend\models\User;
use backend\models\DailyHours;
use yii\helpers\Html;
use yii\helpers\ArrayHelper;

// --- 1. INITIALIZATION ---
$request = Yii::$app->request;
$absUrl = $request->absoluteUrl;

// FIX: Define these FIRST so the loop below works
$realMonth = date('m');
$realYear  = date('Y');
$selectedMonth = $request->get('month', date('m'));
$selectedYear  = $request->get('year', date('Y'));
$realToday     = date('Y-m-d');
$filterDate    = $request->get('filter_date', $realToday);
$todayDate     = $realToday;
$yesterday = date('Y-m-d', strtotime('-1 day'));
$anomalyDate   = $request->get('anomaly_date', $yesterday); // Simple date picker for anomalies

// Now that Month/Year are defined, calculate days and occurrences
$daysInMonth = cal_days_in_month(CAL_GREGORIAN, (int)$selectedMonth, (int)$selectedYear);
$weekdayOccurrences = ['Mon' => 0, 'Tue' => 0, 'Wed' => 0, 'Thu' => 0, 'Fri' => 0, 'Sat' => 0, 'Sun' => 0];

for ($d = 1; $d <= $daysInMonth; $d++) {
$wd = date('D', strtotime("$selectedYear-$selectedMonth-$d"));
if (isset($weekdayOccurrences[$wd])) {
$weekdayOccurrences[$wd]++;
}
}

// Counters for the Charts
$distPresent = 0;
$distLate    = 0;

// --- 2. FETCH DATA ---
$query = User::find()->alias('u')->innerJoin('mii_user_details ud', 'ud.user_id = u.id')->where(['u.status' => 2])->all();
$users = ArrayHelper::map($query, 'id', 'username');


// --- 2. FETCH DATA (Added Filter Date support) ---
$startDate = "$selectedYear-$selectedMonth-01";
$endDate   = "$selectedYear-$selectedMonth-$daysInMonth";

$attendanceRecords = DailyHours::find()
->where(['between', 'office_date', $startDate, $endDate]) // Trends Month
->orWhere(['office_date' => $anomalyDate]) // Anomaly Date (simple date picker)
->orWhere(['office_date' => $realToday]) // Real Today KPIs
->orWhere(['office_date' => $filterDate]) // Distribution chart date picker
->asArray()
->all();

// --- 3. PROCESS DATA ---
$presentToday = 0;
$lateLogins = 0;
$anomalies = [];
$recentActivity = [];
$weeklyStats = ['Mon' => 0, 'Tue' => 0, 'Wed' => 0, 'Thu' => 0, 'Fri' => 0, 'Sat' => 0, 'Sun' => 0];

foreach ($attendanceRecords as $record) {
$date = $record['office_date'];
$recMonth = date('m', strtotime($date));
$recYear  = date('Y', strtotime($date));

// 1. LIVE KPI & ACTIVITY FEED (Locked to Real Today)
if ($date == $realToday) {
if (!empty($record['in_time'])) {
$t = explode(' ', $record['in_time']);
$timeOnly = $t[1] ?? $t[0];
if (strtotime($timeOnly) > strtotime("10:30:00")) {
$lateLogins++;
} else {
$presentToday++;
}
}
$recentActivity[] = $record;
}

// 2. TRENDS LOGIC (Follows Trend Dropdown)
if ($recMonth == $selectedMonth && $recYear == $selectedYear) {
$dayName = date('D', strtotime($date));
if (isset($weeklyStats[$dayName])) { $weeklyStats[$dayName]++; }
}

// 3. DISTRIBUTION CHART LOGIC (Follows Date Picker)
if ($date == $filterDate) {
if (!empty($record['in_time'])) {
$t = explode(' ', $record['in_time']);
$timeOnly = $t[1] ?? $t[0];
if (strtotime($timeOnly) > strtotime("10:30:00")) {
$distLate++;
} else {
$distPresent++;
}
}
}

// 4. ANOMALIES LOGIC (Follows Date Picker exclusively)
if ($date == $anomalyDate) {
$site = !empty($record['location_name']) ? $record['location_name'] : 'N/A';
if (!empty($record['in_time'])) {
$t = explode(' ', $record['in_time']);
$timeOnly = $t[1] ?? $t[0];
if (strtotime($timeOnly) > strtotime("10:30:00")) {
$anomalies[] = ['user' => $record['developer_id'], 'tag' => 'LATE', 'msg' => "Late login: $timeOnly", 'color' => 'orange','site' => $site];
}
}
if (empty($record['out_time']) && $date < $realToday) {
$anomalies[] = ['user' => $record['developer_id'], 'tag' => 'MISSING', 'msg' => "No clock-out recorded", 'color' => 'red', 'site' => $site];
}
}
}

// Section 3: Add this after the foreach loop ends
$averageDailyStats = [];
foreach ($weeklyStats as $day => $totalCount) {
$count = $weekdayOccurrences[$day];
// Divide total monthly check-ins by the number of times that day happened
$averageDailyStats[] = ($count > 0) ? round($totalCount / $count, 1) : 0;
}

$workforce = count($users);
// The sum of these three will now exactly equal $workforce
$absent = max(0, $workforce - ($presentToday + $lateLogins));

// The sum of these three will now exactly equal $workforce for the chart
$distAbsent = max(0, $workforce - ($distPresent + $distLate));
// Chart Configs
// --- 3. PROCESS DATA (Chart Styling Update) ---

// Modern Palette
$colorPresent = "#10b981"; // Emerald
$colorLate    = "#f59e0b"; // Amber
$colorAbsent  = "#ef4444"; // Rose
$colorGrid    = "#e5e7eb"; // Light Gray grid

// --- 3. PROCESS DATA (Vibrant Styling with Outside Labels) ---

// High-Vibrancy SaaS Palette
$vibrantPresent = "#00ffa3"; // Electric Green
$vibrantLate    = "#ffaa00"; // Bright Amber
$vibrantAbsent  = "#ff4b5c"; // Neon Red

$distConfig = [
"type" => "doughnut",
"data" => [
"labels" => ["Absent", "Late", "Present"],
"datasets" => [[
"data" => [$distAbsent, $distLate, $distPresent],
"backgroundColor" => [$vibrantAbsent, $vibrantLate, $vibrantPresent],
"borderWidth" => 3,
"borderColor" => "#ffffff"
]]
],
"options" => [
"cutoutPercentage" => 40,
"legend" => ["display" => false], // Hide legend to give space for labels
"plugins" => [
"datalabels" => [
"anchor" => "end",
"align" => "end",
"color" => "#4b5563",
"font" => ["family" => "Inter", "size" => 12, "weight" => "bold"],
"formatter" => "ctx.chart.data.labels[ctx.dataIndex] + ': ' + ctx.dataset.data[ctx.dataIndex]"
]
]
]
];

$distUrl = "https://quickchart.io/chart?w=450&h=350&c=" . urlencode(json_encode($distConfig));

// 2. Trend Bar Chart
$trendConfig = [
"type" => "bar",
"data" => [
"labels" => array_keys($weeklyStats),
"datasets" => [[
"label" => "Avg. Present",
"data" => $averageDailyStats,
"backgroundColor" => $colorPresent,
"borderRadius" => 10, // Rounded bars
"borderSkipped" => false
]]
],
"options" => [
"legend" => ["display" => false],
"scales" => [
"yAxes" => [[
"gridLines" => [ "color" => $colorGrid, "drawBorder" => false ],
"ticks" => [
"beginAtZero" => true,
"max" => $workforce + 15,
"stepSize" => 50,
"fontFamily" => "Inter",
"fontColor" => "#9ca3af",
"padding" => 10
]
]],
"xAxes" => [[
"gridLines" => [ "display" => false ],
"ticks" => [ "fontFamily" => "Inter", "fontColor" => "#9ca3af" ]
]]
]
]
];

$trendUrl = "https://quickchart.io/chart?w=400&h=300&c=" . urlencode(json_encode($trendConfig));

// --- 4. RENDER CSS ---
echo <<<CSS
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
:root {
--theme-orange: #fc7d07;
--bg: #f3f4f6;
--card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
--hover-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.04);
}

body { background-color: var(--bg); font-family: 'Inter', "Segoe UI", sans-serif; color: #1f2937; }

.dash-title {
font-weight: 800;
font-size: 1.85rem;
letter-spacing: -0.025em;
background: linear-gradient(90deg, #fc7d07, #ffa500);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
border-left: 6px solid var(--theme-orange);
padding-left: 15px;
}

.glass-card {
background: #ffffff;
border-radius: 24px;
border: 1px solid rgba(255, 255, 255, 0.7);
box-shadow: var(--card-shadow);
padding: 24px;
height: 100%;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
transform: translateY(-5px);
box-shadow: var(--hover-shadow);
}

/* KPI Card Gradients */
.kpi-present { border-bottom: 5px solid #10b981 !important; background: linear-gradient(to bottom, #fff, #f0fdf4); }
.kpi-late { border-bottom: 5px solid #f59e0b !important; background: linear-gradient(to bottom, #fff, #fffbeb); }
.kpi-absent { border-bottom: 5px solid #ef4444 !important; background: linear-gradient(to bottom, #fff, #fef2f2); }

.anomaly-box {
background: #fdf8f3;
border-radius: 16px;
padding: 16px;
margin-bottom: 12px;
border: 1px solid rgba(252, 125, 7, 0.1);
transition: transform 0.2s ease;
}
.anomaly-box:hover { transform: scale(1.02); }
.anomaly-box.red { background: #fef2f2; border-color: rgba(239, 68, 68, 0.1); }

.integrity-card {
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
color: white;
border-radius: 24px;
padding: 30px;
position: relative;
overflow: hidden;
}
.integrity-card::after {
content: ''; position: absolute; top: -50%; right: -50%; width: 100%; height: 100%;
background: rgba(255,255,255,0.03); border-radius: 50%;
}

h6 { font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem; margin-bottom: 0; }
h3 { font-weight: 800; letter-spacing: -0.05em; }

.chart-container {
position: relative;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
}

.chart-container img {
max-width: 100%;
height: auto;
filter: drop-shadow(0 4px 6px rgba(0,0,0,0.02));
}

/* Custom Scrollbar */
.glass-card::-webkit-scrollbar {
width: 6px;
}
.glass-card::-webkit-scrollbar-track {
background: transparent;
}
.glass-card::-webkit-scrollbar-thumb {
background: #e5e7eb;
border-radius: 10px;
}

/* Enhanced Date Picker Styling */
.date-picker-wrapper {
position: relative;
display: inline-block;
}

.enhanced-date-picker {
appearance: none;
-webkit-appearance: none;
background: #ffffff;
border: 1.5px solid #e5e7eb;
border-radius: 12px;
padding: 8px 32px 8px 12px;
font-size: 13px;
font-weight: 500;
color: #1f2937;
outline: none;
transition: all 0.2s ease;
cursor: pointer;
font-family: 'Inter', sans-serif;
min-width: 150px;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23fc7d07' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'%3E%3C/path%3E%3C/svg%3E");
background-repeat: no-repeat;
background-position: right 10px center;
background-size: 18px;
}

.enhanced-date-picker:hover {
border-color: var(--theme-orange);
box-shadow: 0 2px 8px rgba(252, 125, 7, 0.1);
transform: translateY(-1px);
}

.enhanced-date-picker:focus {
border-color: var(--theme-orange);
outline: none;
box-shadow: 0 0 0 3px rgba(252, 125, 7, 0.15);
}

/* Hide default calendar icon */
.enhanced-date-picker::-webkit-calendar-picker-indicator {
opacity: 0;
position: absolute;
right: 0;
width: 100%;
height: 100%;
cursor: pointer;
}

/* Small variant */
.enhanced-date-picker-sm {
padding: 6px 28px 6px 10px;
font-size: 12px;
min-width: 130px;
background-size: 16px;
background-position: right 8px center;
}

/* Modern Select Dropdown */
.modern-select {
background-color: #ffffff;
border: 1.5px solid #e5e7eb;
border-radius: 12px;
padding: 8px 12px;
font-size: 13px;
font-weight: 500;
color: #1f2937;
outline: none;
transition: all 0.2s ease;
cursor: pointer;
font-family: 'Inter', sans-serif;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23fc7d07' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
background-repeat: no-repeat;
background-position: right 10px center;
background-size: 16px;
appearance: none;
}

.modern-select:hover {
border-color: var(--theme-orange);
box-shadow: 0 2px 8px rgba(252, 125, 7, 0.1);
}

.modern-select:focus {
border-color: var(--theme-orange);
outline: none;
box-shadow: 0 0 0 3px rgba(252, 125, 7, 0.15);
}

/* Filter header layout */
.filter-header {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
}

.filter-header h6 {
margin-bottom: 0;
}

.filter-control {
display: flex;
align-items: center;
gap: 8px;
}

/* Date display text */
.date-indicator {
font-size: 12px;
color: #6b7280;
margin-top: 8px;
padding-top: 8px;
border-top: 1px solid #f3f4f6;
}

.date-indicator i {
margin-right: 6px;
color: var(--theme-orange);
}

/* Loading state */
#attendance-wrapper.loading {
opacity: 0.6;
pointer-events: none;
transition: opacity 0.2s ease;
}
</style>
CSS;

// --- DEVICE HEALTH FETCH ---
$deviceHealth = (new \yii\db\Query())
->from('mii_device_health')
->orderBy(['last_seen' => SORT_DESC])->all();


// Format the anomaly date for display
$formattedAnomalyDate = date('l, F j, Y', strtotime($anomalyDate));
$formattedFilterDate = date('l, F j, Y', strtotime($filterDate));

// --- 5. RENDER HTML ---
echo '<div id="attendance-wrapper" class="container-fluid py-4">';

// Header
echo '<div class="d-flex justify-content-between align-items-center mb-4">';
echo '<div><h1 class="dash-title mb-0">Attendance Report</h1><p class="text-muted small mt-1">OVERVIEW OF WORKFORCE ACTIVITY</p></div>';
echo '</div>';

// KPI Cards
echo '<div class="row g-3 mb-4 text-center">';
echo '<div class="col-md-3"><div class="glass-card"><h6>WORKFORCE</h6><h3>'.$workforce.'</h3></div></div>';
echo '<div class="col-md-3"><div class="glass-card kpi-present"><h6>PRESENT TODAY</h6><h3>'.$presentToday.'</h3></div></div>';
echo '<div class="col-md-3"><div class="glass-card kpi-late"><h6>LATE TODAY</h6><h3>'.$lateLogins.'</h3></div></div>';
echo '<div class="col-md-3"><div class="glass-card kpi-absent"><h6>ABSENT TODAY</h6><h3>'.$absent.'</h3></div></div>';
echo '</div>';

// Three Column Layout
echo '<div class="row g-4 mb-4">';

// Distribution Card
echo '<div class="col-lg-4">
<div class="glass-card">
<div class="filter-header">
<h6><i class="fas fa-chart-pie me-2"></i>Distribution</h6>
<div class="filter-control">
<input type="date" id="mini-date-picker" class="enhanced-date-picker enhanced-date-picker-sm" value="'.$filterDate.'">
</div>
</div>
<div class="chart-container"><img src="'.$distUrl.'" alt="Distribution Chart"></div>
<div class="date-indicator">
<i class="fas fa-calendar-day"></i> Showing data for <strong>' . $formattedFilterDate . '</strong>
</div>
</div>
</div>';

// Trends Card
echo '<div class="col-lg-4">
<div class="glass-card">
<div class="filter-header">
<h6><i class="fas fa-chart-line me-2"></i>Avg. Trends</h6>
<div class="filter-control">
<select id="trend-month-filter" class="modern-select" style="min-width: 130px;">';
for($m=1; $m<=12; $m++) {
$mPadded = sprintf("%02d", $m);
$sel = ($mPadded == $selectedMonth) ? 'selected' : '';
echo "<option value='$mPadded' $sel>".date("F", mktime(0,0,0,$m,1))."</option>";
}
echo '</select>
</div>
</div>
<div class="chart-container"><img src="'.$trendUrl.'" alt="Trends Chart"></div>
<div class="date-indicator">
<i class="fas fa-chart-simple"></i> Average attendance for ' . date('F Y', strtotime("$selectedYear-$selectedMonth-01")) . '
</div>
</div>
</div>';

// Anomalies Card with Date Picker
echo '<div class="col-lg-4">
<div class="glass-card overflow-auto" style="max-height:697px;">
<div class="filter-header">
<h6><i class="fas fa-exclamation-triangle me-2"></i>Anomalies <span class="badge bg-danger ms-1">' . count($anomalies) . '</span></h6>
<div class="filter-control">
<input type="date" id="anomaly-date-picker" class="enhanced-date-picker enhanced-date-picker-sm" value="'.$anomalyDate.'">
</div>
</div>
<div class="date-indicator">
<i class="fas fa-calendar-alt"></i> Showing anomalies for <strong>' . $formattedAnomalyDate . '</strong>
</div>
<div class="mt-3">';

if (empty($anomalies)) {
echo '<div class="text-center text-muted py-5">
<i class="fas fa-check-circle fa-3x mb-3 d-block" style="color: #10b981;"></i>
<p class="mb-0 fw-semibold">No anomalies found</p>
<small class="text-muted">All check-ins and check-outs are complete for this date</small>
</div>';
} else {
foreach ($anomalies as $a) {

    $redClass = ($a['tag'] == 'MISSING') ? 'red' : '';
    $userName = isset($users[$a['user']]) ? $users[$a['user']] : "Unknown";
    $siteName = isset($a['site']) ? $a['site'] : "Unknown";
    $icon     = ($a['tag'] == 'LATE') ? '<i class="fas fa-clock"></i>' : '<i class="fas fa-hourglass-end"></i>';
    $tagClass = ($a['tag'] == 'LATE') ? 'bg-warning' : 'bg-danger';
    $iconColor = ($a['tag'] == 'LATE') ? 'warning' : 'danger';


    echo "<div class='anomaly-box $redClass'>
            <div class='d-flex align-items-start gap-3'>
                <div style='font-size: 20px;' class='text-$iconColor'>$icon</div>
                <div class='flex-grow-1'>
                    <div class='d-flex justify-content-between align-items-start'>
                        <div class='d-flex align-items-center gap-2 flex-wrap'>
                            <span class='fw-bold'>$userName</span>
                            <small class='text-primary font-monospace ms-1' style='font-size: 0.7rem; text-transform: uppercase;'>
                                <i class='fas fa-location-dot me-1'></i>$siteName
                            </small>
                            <span class='badge $tagClass text-light'>{$a['tag']}</span>
                        </div>
                    </div>
                    <!-- Displaying the Site Name -->

                    <small class='text-muted d-block mt-1'>{$a['msg']}</small>
                </div>
            </div>
          </div>";
}
}

echo '</div></div></div>';
echo '</div>';

// Activity Feed & Integrity
echo '<div class="row g-4">';
echo '<div class="col-lg-6"><div class="glass-card"><h5 class="fw-bold mb-3"><i class="fas fa-clock me-2"></i>Recent Activity</h5><div class="table-responsive"><table class="table table-borderless align-middle"><thead><tr class="text-muted small text-uppercase"><th>User</th><th>Check In</th><th>Check Out</th></tr></thead><tbody>';
foreach(array_slice($recentActivity, 0, 5) as $act) {
$in = !empty($act['in_time']) ? date('h:i A', strtotime($act['in_time'])) : '--:--';
$out = !empty($act['out_time']) ? date('h:i A', strtotime($act['out_time'])) : '--:--';
$userName = isset($users[$act['developer_id']]) ? $users[$act['developer_id']] : 'Unknown';
$lateClass = (strtotime($act['in_time']) > strtotime('10:30:00')) ? 'text-danger' : 'text-success';
echo "<tr>";
echo "<td><strong>$userName</strong></td>";
echo "<td class='$lateClass fw-bold'>$in</td>";
echo "<td class='text-muted'>$out</td>";
echo "</tr>";
}
echo '</tbody></table></div></div></div>';

// device health

echo '<div class="col-lg-6">
<div class="glass-card">
<h5 class="fw-bold mb-4"><i class="fas fa-shield-alt me-2 text-primary"></i>Device Network Integrity</h5>
<div class="table-responsive">
<table class="table table-hover align-middle">
<thead>
<tr class="text-muted small text-uppercase" style="border-bottom: 2px solid #f3f4f6;">
<th class="pb-3">Location</th>
<th class="pb-3">Device / Serial</th>
<th class="pb-3">Status</th>
<th class="pb-3">Connection</th>
<th class="pb-3">Last Seen</th>
</tr>
</thead>
<tbody>';

foreach ($deviceHealth as $device) {
// --- Existing Logic Preserved ---
$deviceSN = $device['device_sn'] ?? '-';
$deviceLocation = $device['location'] ?? '-';
$deviceStatus = ($device['status'] == 'ONLINE') ? 'Online' : 'Offline';
$deviceLastSeen = $device['last_seen'] ?? '-';
$statusColor = ($device['status'] == 'ONLINE') ? '#10b981' : '#ef4444';

$uptimeText = 'Connection Pending';
if ($deviceLastSeen && $deviceLastSeen != '-') {
$lastSeenTime = strtotime($deviceLastSeen);
$nowTime = time();
$diffMinutes = floor(($nowTime - $lastSeenTime) / 60);

if ($diffMinutes <= 5) {
$uptimeText = 'Live';
} elseif ($diffMinutes <= 60) {
$uptimeText = $diffMinutes . ' min ago';
} else {
$hours = floor($diffMinutes / 60);
$uptimeText = $hours . ' hr ago';
}
}

// --- Table Row Generation ---
echo '<tr>
<td>
<span class="text-secondary small"><i class="fas fa-map-marker-alt me-1"></i> ' . $deviceLocation . '</span>

</td>
<td>
<div class="fw-bold text-dark">' .  $deviceSN . '</div>
</td>
<td>
<div class="d-flex align-items-center">
<span style="height: 10px; width: 10px; background-color: ' . $statusColor . '; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
<span class="fw-bold" style="color: ' . $statusColor . '; font-size: 13px;">' . strtoupper($deviceStatus) . '</span>
</div>
</td>
<td>
<span class="badge bg-light text-dark border fw-medium" style="padding: 6px 10px;">' . $uptimeText . '</span>
</td>
<td>
<div class="small fw-bold text-dark">' . ($deviceLastSeen != '-' ? date('M j, Y', strtotime($deviceLastSeen)) : '-') . '</div>
<div class="text-muted" style="font-size: 11px;">' . ($deviceLastSeen != '-' ? date('g:i A', strtotime($deviceLastSeen)) : '-') . '</div>
</td>
</tr>';
}

echo '      </tbody>
</table>
</div>
</div>
</div>';



echo '</div>';
echo '</div>';

// --- 6. JAVASCRIPT ---
echo <<<JS
<script>
// Handle all filter changes
document.addEventListener('change', function(e) {
const targetId = e.target?.id;
const validFilters = ['mini-date-picker', 'trend-month-filter', 'anomaly-date-picker'];

if (targetId && validFilters.includes(targetId)) {
const dateVal = document.getElementById('mini-date-picker')?.value || '';
const monthVal = document.getElementById('trend-month-filter')?.value || '';
const anomalyDateVal = document.getElementById('anomaly-date-picker')?.value || '';

const wrapper = document.getElementById('attendance-wrapper');
const url = new URL("{$absUrl}");

if (dateVal) url.searchParams.set('filter_date', dateVal);
if (monthVal) url.searchParams.set('month', monthVal);
if (anomalyDateVal) url.searchParams.set('anomaly_date', anomalyDateVal);

url.searchParams.set('_t', Date.now());

// Add loading class
if (wrapper) {
wrapper.classList.add('loading');
}

fetch(url.toString())
.then(r => r.text())
.then(html => {
const doc = new DOMParser().parseFromString(html, 'text/html');
const newContent = doc.getElementById('attendance-wrapper');
if (newContent && wrapper) {
wrapper.replaceWith(newContent);
}
})
.catch(err => console.error('Error:', err));
}
});
</script>
JS;

exit;



