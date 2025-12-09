
// Utility to format currency
const formatCurrency = (value) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);

// --- Admin Dashboard Logic ---
function initAdminDashboard() {
    console.log("Initializing Admin Dashboard...");
    lucide.createIcons();

    const stats = [
        { title: "Documentos Totales", value: "1,284", icon: "file-text", trend: { value: 12, positive: true } },
        { title: "Boletas Registradas", value: "456", icon: "receipt", trend: { value: 8, positive: true } },
        { title: "Proyectos Activos", value: "23", icon: "folder-open" },
        { title: "Usuarios Activos", value: "18", icon: "users" },
    ];

    const chartData = {
        months: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        documents: [85, 102, 95, 120, 145, 132]
    };

    const pieData = {
        labels: ["Contratos", "Presupuestos", "Informes", "Facturas", "Otros"],
        data: [35, 25, 20, 15, 5],
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"]
    };

    // Render Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = '';
        stats.forEach(stat => {
            const trendHtml = stat.trend
                ? `<span class="${stat.trend.positive ? 'text-green-500' : 'text-red-500'} text-xs flex items-center">
                    ${stat.trend.positive ? '+' : ''}${stat.trend.value}% 
                    <i data-lucide="${stat.trend.positive ? 'trending-up' : 'trending-down'}" class="w-3 h-3 ml-1"></i>
                </span>`
                : '';

            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-lg border shadow-sm";
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-medium text-gray-500">${stat.title}</h3>
                    <i data-lucide="${stat.icon}" class="w-4 h-4 text-gray-400"></i>
                </div>
                <div class="flex items-end justify-between">
                    <div class="text-2xl font-bold">${stat.value}</div>
                    ${trendHtml}
                </div>
            `;
            statsGrid.appendChild(card);
        });
    }

    // Render Charts
    // Helper to get CSS variable value
    const getHSL = (variable) => `hsl(${getComputedStyle(document.documentElement).getPropertyValue(variable).trim()})`;

    // Metric cards


    // Render Charts
    const ctxBar = document.getElementById('barChart');
    if (ctxBar) {
        new Chart(ctxBar.getContext('2d'), {
            type: 'bar',
            data: {
                labels: chartData.months,
                datasets: [{
                    label: 'Documentos',
                    data: chartData.documents,
                    backgroundColor: getHSL('--accent'),
                    borderRadius: 4,
                    barPercentage: 0.6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: getHSL('--card'),
                        titleColor: getHSL('--foreground'),
                        bodyColor: getHSL('--foreground'),
                        borderColor: getHSL('--border'),
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: getHSL('--muted'),
                            borderDash: [3, 3],
                            drawBorder: false,
                        },
                        ticks: { color: getHSL('--muted-foreground') }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: getHSL('--muted-foreground') }
                    }
                }
            }
        });
    }

    const ctxPie = document.getElementById('pieChart');
    if (ctxPie) {
        const pieColors = [
            getHSL('--accent'),        // Contratos
            getHSL('--chart-2'),       // Presupuestos
            getHSL('--chart-3'),       // Informes
            getHSL('--chart-4'),       // Facturas
            getHSL('--chart-5')        // Otros
        ];

        new Chart(ctxPie.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: pieData.labels,
                datasets: [{
                    data: pieData.data,
                    backgroundColor: pieColors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%', // Match innerRadius usually around 70-80%
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: getHSL('--card'),
                        bodyColor: getHSL('--foreground'),
                        borderColor: getHSL('--border'),
                        borderWidth: 1,
                        padding: 10,
                    }
                }
            }
        });

        // Custom Legend Generation
        const legendContainer = document.getElementById('pie-legend');
        if (legendContainer) {
            legendContainer.innerHTML = pieData.labels.map((label, i) => `
                <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${pieColors[i]}"></div>
                    <span class="text-xs text-gray-600">${label}</span>
                </div>
            `).join('');
        }
    }

    // Render Table (reusing logic if needed, or specific per page)
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        const recentDocuments = [
            { id: "DOC-001", nombre: "Contrato Proyecto Mall", tipo: "Contrato", fecha: "2025-12-08", estado: "Activo", proyecto: "Mall Centro" },
            { id: "DOC-002", nombre: "Presupuesto Local A1", tipo: "Presupuesto", fecha: "2025-12-07", estado: "Pendiente", proyecto: "Local Comercial A1" },
            { id: "DOC-003", nombre: "Informe Avance Dic", tipo: "Informe", fecha: "2025-12-06", estado: "Activo", proyecto: "Torre Residencial" },
            { id: "DOC-004", nombre: "Factura Materiales", tipo: "Factura", fecha: "2025-12-05", estado: "Procesado", proyecto: "Mall Centro" },
            { id: "DOC-005", nombre: "Planos Estructurales", tipo: "Plano", fecha: "2025-12-04", estado: "Activo", proyecto: "Local Comercial A1" },
        ];

        tableBody.innerHTML = '';
        recentDocuments.forEach(doc => {
            const row = document.createElement('tr');
            row.className = "border-b transition-colors hover:bg-gray-50/50";

            let badgeClass = "";
            if (doc.estado === "Activo") badgeClass = "bg-blue-100 text-blue-800 border-blue-200";
            else if (doc.estado === "Pendiente") badgeClass = "bg-red-100 text-red-800 border-red-200";
            else badgeClass = "bg-gray-100 text-gray-800";

            row.innerHTML = `
                <td class="p-4 align-middle font-medium">${doc.id}</td>
                <td class="p-4 align-middle">${doc.nombre}</td>
                <td class="p-4 align-middle"><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">${doc.tipo}</span></td>
                <td class="p-4 align-middle">${doc.proyecto}</td>
                <td class="p-4 align-middle">${doc.fecha}</td>
                <td class="p-4 align-middle">
                    <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClass}">
                        ${doc.estado}
                    </span>
                </td>
                <td class="p-4 align-middle">
                     <div class="flex gap-1">
                        <button class="p-2 hover:bg-gray-100 rounded text-gray-500"><i data-lucide="eye" class="w-4 h-4"></i></button>
                        <button class="p-2 hover:bg-gray-100 rounded text-gray-500"><i data-lucide="edit" class="w-4 h-4"></i></button>
                        <button class="p-2 hover:bg-gray-100 rounded text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    lucide.createIcons();
}

// --- Jefe de Proyecto Logic ---
function initJefeDashboard() {
    console.log("Initializing Jefe Dashboard...");
    lucide.createIcons();

    const stats = [
        { title: "Proyectos Activos", value: "12", icon: "briefcase", trend: { value: 2, positive: true } },
        { title: "Tareas Pendientes", value: "48", icon: "clock", trend: { value: 5, positive: false } },
        { title: "Hitos Este Mes", value: "8", icon: "calendar" },
        { title: "Miembros", value: "24", icon: "users" },
    ];

    const container = document.getElementById('stats-grid-jefe');
    if (container) {
        container.innerHTML = '';
        stats.forEach(stat => {
            const trendHtml = stat.trend
                ? `<span class="${stat.trend.positive ? 'text-green-500' : 'text-red-500'} text-xs flex items-center">
                    ${stat.trend.positive ? '+' : ''}${stat.trend.value}% 
                    <i data-lucide="${stat.trend.positive ? 'trending-up' : 'trending-down'}" class="w-3 h-3 ml-1"></i>
                </span>`
                : '';

            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-lg border shadow-sm";
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-medium text-gray-500">${stat.title}</h3>
                    <i data-lucide="${stat.icon}" class="w-4 h-4 text-gray-400"></i>
                </div>
                <div class="flex items-end justify-between">
                    <div class="text-2xl font-bold">${stat.value}</div>
                    ${trendHtml}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Projects List
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        const projects = [
            { id: "PRY-001", nombre: "Mall Centro Arequipa", cliente: "Grupo Retail S.A.", progreso: 75, estado: "En Progreso" },
            { id: "PRY-002", nombre: "Local Comercial A1", cliente: "Inversiones Norte", progreso: 45, estado: "En Progreso" },
            { id: "PRY-003", nombre: "Torre Residencial Sur", cliente: "Constructora ABC", progreso: 90, estado: "Por Finalizar" },
        ];

        projectsList.innerHTML = '';
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = "rounded-lg border bg-white p-4 hover:shadow-md transition-shadow";
            card.innerHTML = `
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <h3 class="font-semibold">${p.nombre}</h3>
                        <p class="text-sm text-gray-500">${p.cliente}</p>
                    </div>
                    <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">${p.estado}</span>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span class="font-medium">${p.progreso}%</span>
                    </div>
                    <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 transition-all" style="width: ${p.progreso}%"></div>
                    </div>
                </div>
             `;
            projectsList.appendChild(card);
        });
    }

    // Tasks List
    const tasksList = document.getElementById('tasks-list');
    if (tasksList) {
        const tasks = [
            { titulo: "Revisar planos estructurales", proyecto: "Mall Centro", prioridad: "Alta", vence: "Hoy" },
            { titulo: "Aprobar presupuesto", proyecto: "Local A1", prioridad: "Media", vence: "Mañana" },
            { titulo: "Reunión contratistas", proyecto: "Torre Sur", prioridad: "Alta", vence: "Hoy" },
        ];

        tasksList.innerHTML = '';
        tasks.forEach(t => {
            const row = document.createElement('div');
            row.className = "flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors";
            row.innerHTML = `
                 <i data-lucide="${t.prioridad === 'Alta' ? 'alert-triangle' : 'check-circle-2'}" class="w-4 h-4 ${t.prioridad === 'Alta' ? 'text-red-500' : 'text-orange-500'} mt-0.5"></i>
                 <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">${t.titulo}</p>
                    <p class="text-xs text-gray-500">${t.proyecto}</p>
                 </div>
                 <span class="text-xs border px-2 py-0.5 rounded bg-white text-gray-600">${t.vence}</span>
            `;
            tasksList.appendChild(row);
        });
    }

    // Progress Chart
    const ctxProgress = document.getElementById('progressChart');
    if (ctxProgress) {
        new Chart(ctxProgress.getContext('2d'), {
            type: 'line',
            data: {
                labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
                datasets: [{
                    label: 'Avance General',
                    data: [15, 28, 42, 55, 68, 75],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }
    lucide.createIcons();
}

// --- Operativo Dashboard Logic ---
function initOperativoDashboard() {
    console.log("Initializing Operativo Dashboard...");
    lucide.createIcons();

    const stats = [
        { title: "Presupuestos Activos", value: "18", icon: "calculator", trend: { value: 15, positive: true } },
        { title: "Materiales Registrados", value: "342", icon: "building-2" },
        { title: "Mano de Obra", value: "86", icon: "users" },
        { title: "Costo Promedio", value: "S/ 125K", icon: "trending-up", trend: { value: 3, positive: false } },
    ];

    const container = document.getElementById('stats-grid-operativo');
    if (container) {
        container.innerHTML = '';
        stats.forEach(stat => {
            const trendHtml = stat.trend
                ? `<span class="${stat.trend.positive ? 'text-green-500' : 'text-red-500'} text-xs flex items-center">
                    ${stat.trend.positive ? '+' : ''}${stat.trend.value}% 
                    <i data-lucide="${stat.trend.positive ? 'trending-up' : 'trending-down'}" class="w-3 h-3 ml-1"></i>
                </span>`
                : '';

            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-lg border shadow-sm";
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-sm font-medium text-gray-500">${stat.title}</h3>
                    <i data-lucide="${stat.icon}" class="w-4 h-4 text-gray-400"></i>
                </div>
                <div class="flex items-end justify-between">
                    <div class="text-2xl font-bold">${stat.value}</div>
                    ${trendHtml}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Cost Trend Chart
    // Helper to get CSS variable value (reused from Admin)
    const getHSL = (variable) => `hsl(${getComputedStyle(document.documentElement).getPropertyValue(variable).trim()})`;

    // Cost Trend Chart (Line/Points style matching Admin aesthetics)
    // Admin uses bar, but user asked for points/line style. We stick to Line but use Admin's theme colors.
    const ctxTrend = document.getElementById('costTrendChart');
    if (ctxTrend) {
        new Chart(ctxTrend.getContext('2d'), {
            type: 'line',
            data: {
                labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                datasets: [
                    {
                        label: 'Materiales',
                        data: [45000, 52000, 48000, 61000, 75000, 68000],
                        borderColor: getHSL('--chart-1'),
                        backgroundColor: 'transparent',
                        pointBackgroundColor: getHSL('--card'),
                        pointBorderColor: getHSL('--chart-1'),
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Mano de Obra',
                        data: [28000, 32000, 35000, 38000, 42000, 45000],
                        borderColor: getHSL('--chart-2'),
                        backgroundColor: 'transparent',
                        pointBackgroundColor: getHSL('--card'),
                        pointBorderColor: getHSL('--chart-2'),
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 8 } },
                    tooltip: {
                        backgroundColor: getHSL('--card'),
                        titleColor: getHSL('--foreground'),
                        bodyColor: getHSL('--foreground'),
                        borderColor: getHSL('--border'),
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true,
                        usePointStyle: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: getHSL('--muted'), borderDash: [3, 3], drawBorder: false },
                        ticks: { color: getHSL('--muted-foreground') }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: getHSL('--muted-foreground') }
                    }
                }
            }
        });
    }

    // Material List
    const materialsList = document.getElementById('materials-list');
    if (materialsList) {
        const mats = [
            { name: "Cemento Portland", qty: "450 bolsas", cost: 12500 },
            { name: "Fierro Corrugado", qty: "2800 kg", cost: 9800 },
            { name: "Ladrillo King Kong", qty: "15000 und", cost: 8500 },
            { name: "Arena Fina", qty: "85 m³", cost: 6200 },
        ];
        materialsList.innerHTML = '';
        mats.forEach((m, idx) => {
            const d = document.createElement('div');
            d.className = "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors";
            d.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600">${idx + 1}</div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">${m.name}</p>
                    <p class="text-xs text-gray-500">${m.qty}</p>
                </div>
                <span class="text-sm font-medium">${formatCurrency(m.cost)}</span>
            `;
            materialsList.appendChild(d);
        });
    }

    // Budget Table
    const budgetTable = document.getElementById('budget-table-body');
    if (budgetTable) {
        const pptos = [
            { id: "PPTO-001", proyecto: "Mall Centro", mat: 85000, mo: 45000, total: 155000, estado: "Aprobado" },
            { id: "PPTO-002", proyecto: "Local A1", mat: 35000, mo: 22000, total: 65000, estado: "En Revisión" },
            { id: "PPTO-003", proyecto: "Torre Sur", mat: 180000, mo: 120000, total: 345000, estado: "Aprobado" },
        ];
        budgetTable.innerHTML = '';
        pptos.forEach(p => {
            const tr = document.createElement('tr');
            tr.className = "border-b hover:bg-gray-50";
            tr.innerHTML = `
                <td class="p-4 align-middle">${p.id}</td>
                <td class="p-4 align-middle">${p.proyecto}</td>
                <td class="p-4 align-middle">${formatCurrency(p.mat)}</td>
                <td class="p-4 align-middle">${formatCurrency(p.mo)}</td>
                 <td class="p-4 align-middle font-semibold">${formatCurrency(p.total)}</td>
                <td class="p-4 align-middle">
                     <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${p.estado === 'Aprobado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
                        ${p.estado}
                    </span>
                </td>
            `;
            budgetTable.appendChild(tr);
        });
    }

    // Cost Distribution List (Progress bars style per user request)
    const distList = document.getElementById('cost-distribution-list');
    if (distList) {
        // Data
        const items = [
            { label: "Materiales", value: 342000, percent: 55, color: getHSL('--chart-1') },
            { label: "Mano de Obra", value: 215000, percent: 35, color: getHSL('--chart-2') },
            { label: "Equipos", value: 90000, percent: 10, color: getHSL('--chart-3') }
        ];

        // Calculate Total for footer if needed, or just display
        const total = items.reduce((sum, item) => sum + item.value, 0);

        distList.innerHTML = items.map(item => `
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">${item.label}</span>
                    <span class="font-medium">${formatCurrency(item.value)}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full" style="width: ${item.percent}%; background-color: ${item.color}"></div>
                    </div>
                    <span class="text-xs text-gray-500 w-8 text-right">${item.percent}%</span>
                </div>
            </div>
        `).join('') + `
            <div class="pt-4 mt-2 border-t flex justify-between items-center">
                <span class="font-semibold text-gray-700">Total General</span>
                <span class="text-lg font-bold text-foreground">${formatCurrency(total)}</span>
            </div>
        `;
    }

    lucide.createIcons();
}

// --- Sidebar Toggle Logic ---
// --- Sidebar Toggle Logic ---
// --- Sidebar Toggle Logic ---
window.toggleSidebar = function () {
    const sidebar = document.getElementById('app-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');

    if (sidebar) {
        // Desktop Toggle
        const isCollapsed = sidebar.classList.contains('w-16');
        const sidebarTitle = sidebar.querySelector('.sidebar-title');
        const sidebarTexts = sidebar.querySelectorAll('.sidebar-text');
        const menuSectionTitle = sidebar.querySelector('.uppercase.tracking-wider');

        if (window.innerWidth >= 1024) { // Desktop
            if (isCollapsed) {
                sidebar.classList.remove('w-16');
                sidebar.classList.add('w-64');
                if (toggleBtn) toggleBtn.innerHTML = '<i data-lucide="chevron-left" class="h-4 w-4"></i>';
                if (sidebarTitle) sidebarTitle.classList.remove('hidden');
                if (menuSectionTitle) menuSectionTitle.classList.remove('hidden');
                sidebarTexts.forEach(el => el.classList.remove('hidden'));
            } else {
                sidebar.classList.remove('w-64');
                sidebar.classList.add('w-16');
                if (toggleBtn) toggleBtn.innerHTML = '<i data-lucide="chevron-right" class="h-4 w-4"></i>';
                if (sidebarTitle) sidebarTitle.classList.add('hidden');
                if (menuSectionTitle) menuSectionTitle.classList.add('hidden');
                sidebarTexts.forEach(el => el.classList.add('hidden'));
            }
        } else {
            // Mobile Toggle (Simple show/hide)
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('inset-y-0');
            sidebar.classList.toggle('left-0');
            sidebar.classList.toggle('z-50');
            sidebar.classList.toggle('w-64');
            // Add overlay handling if we were fancy, but simple toggle is enough for now
        }
        lucide.createIcons();
    }
}

// Mobile Menu Button Listener
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar(); // Reuse logic or custom
        });
    }

    // Close on click outside for mobile (optional better UX)
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('app-sidebar');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        if (window.innerWidth < 1024 && sidebar && !sidebar.classList.contains('hidden') && !sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
            toggleSidebar();
        }
    });
});

// --- Avisos Logic ---
function initAvisos() {
    console.log("Initializing Avisos...");

    // Initial State
    let avisos = [
        { id: 1, titulo: "Vencimiento de Contrato", msg: "El contrato del proyecto Mall Centro vence en 15 días.", tipo: "alerta", icon: "alert-triangle", color: "text-red-600", bg: "bg-red-50", badge: "bg-red-100 text-red-700", leido: false, date: "2025-12-08" },
        { id: 2, titulo: "Documento Pendiente", msg: "Falta cargar el certificado de inspección.", tipo: "pendiente", icon: "clock", color: "text-yellow-600", bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-700", leido: false, date: "2025-12-07" },
        { id: 3, titulo: "Presupuesto Aprobado", msg: "El presupuesto del Local A1 ha sido aprobado.", tipo: "exito", icon: "check-circle", color: "text-green-600", bg: "bg-green-50", badge: "bg-green-100 text-green-700", leido: true, date: "2025-12-06" },
        { id: 4, titulo: "Reunión de Equipo", msg: "Se ha programado una reunión general.", tipo: "info", icon: "info", color: "text-blue-600", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700", leido: true, date: "2025-12-05" },
    ];

    let currentFilter = 'todos';

    // Elements
    const listContainer = document.getElementById('avisos-list');
    const tabs = document.querySelectorAll('.tab-btn');
    const createBtn = document.getElementById('create-aviso-btn');
    const modal = document.getElementById('aviso-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const saveBtn = document.getElementById('save-aviso');

    // Config Helper
    const getTypeConfig = (type) => {
        switch (type) {
            case 'alerta': return { icon: "alert-triangle", color: "text-red-600", bg: "bg-red-50", badge: "bg-red-100 text-red-700" };
            case 'pendiente': return { icon: "clock", color: "text-yellow-600", bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-700" };
            case 'exito': return { icon: "check-circle", color: "text-green-600", bg: "bg-green-50", badge: "bg-green-100 text-green-700" };
            case 'info': return { icon: "info", color: "text-blue-600", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700" };
            default: return { icon: "info", color: "text-gray-600", bg: "bg-gray-50", badge: "bg-gray-100 text-gray-700" };
        }
    };

    // Render Function
    const render = () => {
        if (!listContainer) return;

        // Filter
        let filtered = avisos;
        if (currentFilter === 'no-leidos') filtered = avisos.filter(a => !a.leido);
        if (currentFilter === 'alertas') filtered = avisos.filter(a => a.tipo === 'alerta');

        listContainer.innerHTML = '';

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12 text-muted-foreground bg-white rounded-lg border">
                    <i data-lucide="bell-off" class="h-12 w-12 mx-auto mb-3 opacity-50"></i>
                    <p>No hay avisos en esta sección</p>
                </div>
            `;
        } else {
            filtered.forEach(a => {
                const card = document.createElement('div');
                card.className = `rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:bg-muted/10 ${!a.leido ? 'border-l-4 border-l-teal-500' : ''}`;

                card.innerHTML = `
                    <div class="p-4 md:p-6">
                        <div class="flex items-start gap-4">
                             <div class="p-2 rounded-full ${a.bg} shrink-0">
                                <i data-lucide="${a.icon}" class="h-5 w-5 ${a.color}"></i>
                             </div>
                             <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between gap-4">
                                    <div>
                                        <h4 class="font-semibold text-base">${a.titulo}</h4>
                                        <p class="text-sm text-muted-foreground mt-1">${a.msg}</p>
                                    </div>
                                    <div class="relative group">
                                        <button class="h-8 w-8 flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded text-muted-foreground transition-colors">
                                            <i data-lucide="more-vertical" class="w-4 h-4"></i>
                                        </button>
                                        <!-- Simple dropdown for demo -->
                                        <div class="absolute right-0 top-8 w-40 bg-white border rounded shadow-lg z-10 hidden group-hover:block hover:block">
                                            <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onclick="window.markRead(${a.id})">Marcar leído</button>
                                            <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600" onclick="window.deleteAviso(${a.id})">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-wrap items-center gap-2 mt-3">
                                     <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${a.badge}">
                                        ${a.tipo.charAt(0).toUpperCase() + a.tipo.slice(1)}
                                     </span>
                                     <span class="text-xs text-gray-400 ml-auto flex items-center gap-1">
                                        <i data-lucide="calendar" class="h-3 w-3"></i> ${a.date}
                                     </span>
                                </div>
                             </div>
                        </div>
                    </div>
                `;
                listContainer.appendChild(card);
            });
        }
        lucide.createIcons();
    };

    // Tab Logic
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('active', 'bg-white', 'shadow-sm'));
            btn.classList.add('active', 'bg-white', 'shadow-sm');
            currentFilter = btn.dataset.tab;
            render();
        });
    });

    // Modal Logic
    if (createBtn && modal && closeModalBtn && saveBtn) {
        createBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });

        saveBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('aviso-title');
            const msgInput = document.getElementById('aviso-msg');
            const typeInput = document.getElementById('aviso-type');

            if (titleInput.value && msgInput.value) {
                const conf = getTypeConfig(typeInput.value);
                const newAviso = {
                    id: Date.now(),
                    titulo: titleInput.value,
                    msg: msgInput.value,
                    tipo: typeInput.value,
                    icon: conf.icon,
                    color: conf.color,
                    bg: conf.bg,
                    badge: conf.badge,
                    leido: false,
                    date: new Date().toISOString().split('T')[0]
                };
                avisos.unshift(newAviso);
                render();

                // Clear and Close
                titleInput.value = '';
                msgInput.value = '';
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }

    // Global actions
    window.markRead = (id) => {
        avisos = avisos.map(a => a.id === id ? { ...a, leido: true } : a);
        render();
    };

    window.deleteAviso = (id) => {
        if (confirm("¿Estás seguro de eliminar este aviso?")) {
            avisos = avisos.filter(a => a.id !== id);
            render();
        }
    };

    render();
}

// Auto-init based on page content
window.addEventListener('DOMContentLoaded', () => {
    // Always render icons (for sidebar toggle, etc.)
    lucide.createIcons();

    // Only init if no specific function was called in the HTML
    // We put explicit calls in the HTML script tags for robustness, but here's a fallback or specific element check:
    if (document.getElementById('stats-grid') && !window.adminInitDone) {
        initAdminDashboard();
        window.adminInitDone = true;
    }
});
