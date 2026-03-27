const today = new Date();
const monthStr = today.toLocaleString('en-US', { month: 'short', year: 'numeric' });

const subtaskOptions = {
  'Data Entry': ['Invoice', 'Claims', 'CRM Update'],
  'Email Support': ['Tier-1', 'Escalation', 'Follow-up'],
  'Verification': ['KYC', 'Address', 'Document'],
  'Processing': ['Refund', 'Onboarding', 'Closure']
};

const team = [
  { name: 'Asha', workload: 92 },
  { name: 'Ravi', workload: 77 },
  { name: 'Maria', workload: 61 },
  { name: 'Noah', workload: 86 }
];

let tasks = [
  { ou: 'US-East', recordId: 'REC-1001', category: 'Data Entry', subtask: 'Invoice', status: 'Open', month: monthStr, receivedDate: '2026-03-24', receivedInfoDate: '2026-03-24', completedDate: '', closedDate: '', complexity: 'Simple', effortMinutes: 45, effortHours: 0.75, sla: 'Yes', slaSlip: '', rework: 'No', reworkClass: '', remarks: 'Waiting for final attachment', resourceName: 'Asha', company: 'Contoso', priority: 'High', updatedAt: '2026-03-26', createdAt: '2026-03-24', dueDate: '2026-03-28' },
  { ou: 'US-West', recordId: 'REC-1002', category: 'Email Support', subtask: 'Tier-1', status: 'Pending', month: monthStr, receivedDate: '2026-03-21', receivedInfoDate: '2026-03-22', completedDate: '', closedDate: '', complexity: 'Medium', effortMinutes: 120, effortHours: 2, sla: 'No', slaSlip: 'Customer Delay', rework: 'Yes', reworkClass: 'Template mismatch', remarks: 'Delayed due to missing logs', resourceName: 'Ravi', company: 'Northwind', priority: 'Medium', updatedAt: '2026-03-27', createdAt: '2026-03-21', dueDate: '2026-03-25' },
  { ou: 'EMEA', recordId: 'REC-1003', category: 'Processing', subtask: 'Refund', status: 'Closed', month: monthStr, receivedDate: '2026-03-20', receivedInfoDate: '2026-03-20', completedDate: '2026-03-23', closedDate: '2026-03-23', complexity: 'Complex', effortMinutes: 200, effortHours: 3.33, sla: 'Yes', slaSlip: '', rework: 'No', reworkClass: '', remarks: 'Completed', resourceName: 'Maria', company: 'Fabrikam', priority: 'Low', updatedAt: '2026-03-23', createdAt: '2026-03-20', dueDate: '2026-03-23' }
];

let sortState = { key: 'recordId', dir: 'asc' };

const formFields = [
  ['ou', 'OU', 'select', ['US-East', 'US-West', 'EMEA', 'APAC']],
  ['recordId', 'Record ID', 'text'],
  ['category', 'Task Category', 'select', Object.keys(subtaskOptions)],
  ['subtask', 'Subtask Category', 'select', []],
  ['status', 'Status', 'select', ['Open', 'Closed', 'Pending']],
  ['month', 'Month', 'text', null, true],
  ['receivedDate', 'Received Date', 'date'],
  ['receivedInfoDate', 'Received All Info On', 'date'],
  ['completedDate', 'Completed Date', 'date'],
  ['closedDate', 'Closed Date', 'date'],
  ['complexity', 'Complexity', 'select', ['Simple', 'Medium', 'Complex']],
  ['effortMinutes', 'Effort in Minutes', 'number'],
  ['effortHours', 'Effort in Hours', 'number', null, true],
  ['sla', 'Met Compliance / SLA', 'select', ['Yes', 'No'], null, false, 'SLA met against due time.'],
  ['slaSlip', 'SLA Slip Category', 'select', ['Customer Delay', 'Dependency', 'System Issue', 'Internal'], null, false, 'Specify only when SLA is No.'],
  ['rework', 'Rework', 'select', ['No', 'Yes'], null, false, 'Yes if task needed reprocessing.'],
  ['reworkClass', 'Rework Classification', 'text'],
  ['remarks', 'Remarks', 'textarea'],
  ['resourceName', 'Resource Name', 'text'],
  ['company', 'Company', 'select', ['Contoso', 'Northwind', 'Fabrikam', 'Globex']]
];

const defaultForm = {
  status: 'Open', month: monthStr, complexity: 'Simple', sla: 'Yes', rework: 'No', effortMinutes: 0, effortHours: 0
};

function el(id) { return document.getElementById(id); }

const state = {
  filterStatus: '', filterCategory: '', filterSla: '', query: '', cardFilter: ''
};

function init() {
  buildForm();
  hydrateFilters();
  bindControls();
  render();
}

function buildForm() {
  const form = el('taskForm');
  const tpl = el('fieldTemplate');
  formFields.forEach(([key, label, type, options, disabled, tooltip]) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.field-label').textContent = label;
    if (tooltip) node.querySelector('.tooltip').title = tooltip;
    const slot = node.querySelector('.input-slot');
    let input;
    if (type === 'select') {
      input = document.createElement('select');
      input.innerHTML = `<option value="">Select</option>` + (options || []).map(o => `<option>${o}</option>`).join('');
    } else if (type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 1;
    } else {
      input = document.createElement('input');
      input.type = type;
    }
    input.name = key;
    if (disabled) input.disabled = true;
    slot.appendChild(input);
    form.appendChild(node);
  });

  Object.entries(defaultForm).forEach(([k,v]) => {
    const control = form.querySelector(`[name="${k}"]`);
    if (control) control.value = v;
  });

  form.addEventListener('input', handleFormInput);
  form.addEventListener('submit', e => e.preventDefault());

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'btn btn-primary';
  submitBtn.textContent = 'Submit Row';
  submitBtn.onclick = addTask;
  form.appendChild(submitBtn);
}

function handleFormInput(e) {
  const form = el('taskForm');
  const data = Object.fromEntries(new FormData(form).entries());
  if (e.target.name === 'category') {
    const subtask = form.querySelector('[name="subtask"]');
    subtask.innerHTML = '<option value="">Select</option>' + (subtaskOptions[data.category] || []).map(o => `<option>${o}</option>`).join('');
  }
  const m = Number(data.effortMinutes || 0);
  form.querySelector('[name="effortHours"]').value = (m / 60).toFixed(2);

  const slip = form.querySelector('[name="slaSlip"]');
  slip.disabled = data.sla !== 'No';
  if (data.sla !== 'No') slip.value = '';

  const reworkClass = form.querySelector('[name="reworkClass"]');
  reworkClass.disabled = data.rework !== 'Yes';
  if (data.rework !== 'Yes') reworkClass.value = '';
}

function addTask() {
  const form = el('taskForm');
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  ['ou', 'recordId', 'category', 'status', 'receivedDate', 'resourceName', 'company'].forEach(req => {
    if (!data[req]) errors[req] = 'Required';
  });
  if (tasks.some(t => t.recordId === data.recordId)) errors.recordId = 'Record ID already exists';

  [...form.querySelectorAll('.field')].forEach(field => {
    const name = field.querySelector('[name]')?.name;
    field.querySelector('.error').textContent = errors[name] || '';
  });
  if (Object.keys(errors).length) return;

  const effortMinutes = Number(data.effortMinutes || 0);
  const newTask = {
    ...data,
    effortMinutes,
    effortHours: Number((effortMinutes / 60).toFixed(2)),
    priority: suggestPriority(data.category, data.complexity),
    updatedAt: today.toISOString().slice(0, 10),
    createdAt: today.toISOString().slice(0, 10),
    dueDate: data.closedDate || data.completedDate || data.receivedDate
  };
  tasks.unshift(newTask);

  const previous = { ou: data.ou, category: data.category, resourceName: data.resourceName, company: data.company };
  form.reset();
  Object.entries({ ...defaultForm, ...previous }).forEach(([k,v]) => {
    const c = form.querySelector(`[name="${k}"]`);
    if (c) c.value = v;
  });
  handleFormInput({ target: { name: 'category' } });
  render();
}

function suggestPriority(category, complexity) {
  if (complexity === 'Complex') return 'High';
  if (category === 'Verification') return 'High';
  if (complexity === 'Medium') return 'Medium';
  return 'Low';
}

function hydrateFilters() {
  const categories = [...new Set(Object.keys(subtaskOptions))];
  el('categoryFilter').innerHTML += categories.map(c => `<option>${c}</option>`).join('');
}

function bindControls() {
  el('statusFilter').addEventListener('change', e => { state.filterStatus = e.target.value; render(); });
  el('categoryFilter').addEventListener('change', e => { state.filterCategory = e.target.value; render(); });
  el('slaFilter').addEventListener('change', e => { state.filterSla = e.target.value; render(); });
  el('globalSearch').addEventListener('input', e => { state.query = e.target.value.toLowerCase(); render(); });
  el('resetFilters').addEventListener('click', () => {
    state.filterStatus = state.filterCategory = state.filterSla = state.query = state.cardFilter = '';
    ['statusFilter','categoryFilter','slaFilter','globalSearch'].forEach(id => el(id).value = '');
    render();
  });
  document.querySelectorAll('.metric').forEach(card => card.addEventListener('click', () => {
    state.cardFilter = card.dataset.filter;
    render();
  }));
  document.querySelectorAll('#taskTable th[data-key]').forEach(th => th.addEventListener('click', () => {
    const key = th.dataset.key;
    sortState.dir = sortState.key === key && sortState.dir === 'asc' ? 'desc' : 'asc';
    sortState.key = key;
    render();
  }));
}

function filteredTasks() {
  return tasks.filter(t => {
    if (state.filterStatus && t.status !== state.filterStatus) return false;
    if (state.filterCategory && t.category !== state.filterCategory) return false;
    if (state.filterSla && t.sla !== state.filterSla) return false;
    if (state.query) {
      const hay = `${t.recordId} ${t.resourceName} ${t.remarks}`.toLowerCase();
      if (!hay.includes(state.query)) return false;
    }
    if (state.cardFilter === 'completed7d' && !isWithinDays(t.completedDate || t.closedDate, 7)) return false;
    if (state.cardFilter === 'dueSoon' && !isDueSoon(t.dueDate, t.status)) return false;
    if (state.cardFilter === 'created' && !t.createdAt) return false;
    if (state.cardFilter === 'updated' && !t.updatedAt) return false;
    return true;
  });
}

function render() {
  const view = filteredTasks();
  renderMetrics(view);
  renderCategory(view);
  renderPriority(view);
  renderTeam(view);
  renderTable(view);
}

function isWithinDays(dateStr, days) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const diff = (today - d) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
}
function isDueSoon(dateStr, status) {
  if (!dateStr || status === 'Closed') return false;
  const d = new Date(dateStr);
  const diff = (d - today) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 3;
}

function renderMetrics(view) {
  el('completedCount').textContent = view.filter(t => isWithinDays(t.completedDate || t.closedDate, 7)).length;
  el('updatedCount').textContent = view.filter(t => t.updatedAt).length;
  el('createdCount').textContent = view.filter(t => t.createdAt).length;
  el('dueSoonCount').textContent = view.filter(t => isDueSoon(t.dueDate, t.status)).length;
}

function renderCategory(view) {
  const host = el('categoryBars');
  const total = view.length || 1;
  const counts = Object.keys(subtaskOptions).map(c => ({ c, n: view.filter(t => t.category === c).length }));
  host.innerHTML = counts.map(({ c, n }) => {
    const pct = Math.round((n / total) * 100);
    return `<div class="progress-row"><div class="progress-meta"><span>${c}</span><span>${pct}% (${n})</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
  }).join('');
}

function renderPriority(view) {
  const priorities = ['High', 'Medium', 'Low'];
  const colors = { High: '#dc2626', Medium: '#f59e0b', Low: '#2563eb' };
  const max = Math.max(1, ...priorities.map(p => view.filter(t => t.priority === p).length));
  el('priorityChart').innerHTML = priorities.map(p => {
    const n = view.filter(t => t.priority === p).length;
    const h = Math.round((n / max) * 140) + 20;
    return `<div class="bar-col"><div>${n}</div><div class="bar" style="height:${h}px;background:${colors[p]}"></div><small>${p}</small></div>`;
  }).join('');
}

function renderTeam(view) {
  const byPerson = view.reduce((a, t) => ((a[t.resourceName] = (a[t.resourceName] || 0) + 1), a), {});
  el('teamWorkload').innerHTML = team.map(u => {
    const dynamic = Math.min(100, u.workload + (byPerson[u.name] || 0) * 4);
    const overloaded = dynamic > 85;
    return `<div class="workload-row ${overloaded ? 'overloaded' : ''}"><strong>${u.name}</strong><div class="progress-bar"><div class="progress-fill" style="width:${dynamic}%;background:${overloaded ? '#dc2626' : '#2563eb'}"></div></div><span>${dynamic}%</span><button class="small-btn">Reassign</button></div>`;
  }).join('');
}

function renderTable(view) {
  const sorted = [...view].sort((a,b) => {
    const va = a[sortState.key] ?? '';
    const vb = b[sortState.key] ?? '';
    return sortState.dir === 'asc' ? String(va).localeCompare(String(vb), undefined, { numeric: true }) : String(vb).localeCompare(String(va), undefined, { numeric: true });
  });
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = sorted.map((t, idx) => {
    const breach = t.sla === 'No';
    const delayed = t.status !== 'Closed' && t.dueDate && new Date(t.dueDate) < today;
    return `<tr class="${delayed ? 'delay' : ''}" data-idx="${idx}">
      <td contenteditable="true" data-edit="recordId">${t.recordId}</td>
      <td>${t.category}</td>
      <td><span class="badge badge-${t.status.toLowerCase()}">${t.status}</span></td>
      <td><span class="badge ${breach ? 'badge-breach' : 'badge-closed'}">${t.sla}</span></td>
      <td>${t.effortHours}</td>
      <td contenteditable="true" data-edit="resourceName">${t.resourceName}</td>
      <td><div class="actions"><button class="small-btn edit-btn">Edit</button><button class="small-btn">View</button></div></td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('blur', e => {
      const row = e.target.closest('tr');
      const task = sorted[Number(row.dataset.idx)];
      const key = e.target.dataset.edit;
      task[key] = e.target.textContent.trim();
      task.updatedAt = today.toISOString().slice(0,10);
      render();
    });
  });
}

init();
