/*!
 * Mercedes-Benz 공통 차량 제원 비교 모듈 — vehicle-compare.js  v1.0.0
 * --------------------------------------------------------------------------
 * 순수 JavaScript · 외부 라이브러리 없음 · GitHub Pages 정적 호스팅용
 *
 * 사용법 (둘 중 하나)
 *   1) HTML 속성만으로:
 *      <div class="mbvc-container" data-base-model="e220d-4matic-exclusive"
 *           data-compare-models="e300-4matic-exclusive,bmw-523d-xdrive"></div>
 *   2) JavaScript로:
 *      MercedesCompare.init({ container: '#myCompare', baseModel: 'e300-4matic-exclusive',
 *                             compareModels: ['e220d-4matic-exclusive', 'e200-exclusive'] });
 *
 * 전역 노출: window.MercedesCompare 하나뿐입니다. CSS 클래스는 모두 "mbvc-" 접두어를 씁니다.
 * 차량 데이터: vehicle-data.js 가 window.MBVC_VEHICLES 에 등록합니다.
 */
(function (window, document) {
  'use strict';
  if (window.MercedesCompare) return;

  var VERSION = '1.0.0';
  var uid = 0;

  /* ------------------------------------------------------------------ *
   * 항목 정의 — 라벨 · 단위 · 표시 형식 · 적용 구동방식
   *   type: 'price' | 'num' | 'text' | 'equip'
   *   from: 'specs' | 'equipment' | 'price' | 'meta'
   *   applies: 해당 구동방식에서만 표시 (없으면 모든 차량)
   * ------------------------------------------------------------------ */
  var ICE = ['gasoline', 'diesel'], ENG = ['gasoline', 'diesel', 'phev'], ELEC = ['phev', 'ev'];
  var FIELDS = {
    price:        { label: '차량 가격', type: 'price', from: 'price' },
    fuel:         { label: '연료', type: 'text', from: 'meta' },
    engine:       { label: '엔진', type: 'text', applies: ENG },
    displacement: { label: '배기량', type: 'num', unit: 'cc', applies: ENG },
    power:        { label: '최고 출력', labelBy: { phev: '엔진 최고 출력' }, type: 'num', unit: 'ps', applies: ENG },
    torque:       { label: '최대 토크', labelBy: { phev: '엔진 최대 토크' }, type: 'num', unit: 'kg·m', dec: 1, applies: ENG },
    systemPower:  { label: '시스템 출력', type: 'num', unit: 'ps', applies: ELEC },
    systemTorque: { label: '시스템 토크', type: 'num', unit: 'kg·m', dec: 1, applies: ELEC },
    motorPower:   { label: '전기모터 출력', type: 'num', unit: 'ps', applies: ELEC },
    motorTorque:  { label: '전기모터 토크', type: 'num', unit: 'kg·m', dec: 1, applies: ELEC },
    drive:        { label: '구동 방식', type: 'text' },
    transmission: { label: '변속기', type: 'text' },
    accel:        { label: '0→100 km/h', type: 'num', unit: '초', dec: 1 },
    topSpeed:     { label: '최고 속도', type: 'num', unit: 'km/h' },
    fuelCombined: { label: '복합 연비', labelBy: { phev: '복합 연비 (내연)' }, type: 'num', unit: 'km/L', dec: 1, applies: ENG },
    fuelCity:     { label: '도심 연비', type: 'num', unit: 'km/L', dec: 1, applies: ENG },
    fuelHighway:  { label: '고속 연비', type: 'num', unit: 'km/L', dec: 1, applies: ENG },
    co2:          { label: 'CO₂ 배출량', type: 'num', unit: 'g/km' },
    evRange:      { label: '전기 주행거리', type: 'num', unit: 'km', applies: ELEC },
    evEfficiency: { label: '복합 전비', type: 'num', unit: 'km/kWh', dec: 1, applies: ELEC },
    battery:      { label: '배터리 용량', type: 'num', unit: 'kWh', dec: 1, applies: ELEC },
    acCharging:   { label: '완속 충전', type: 'text', applies: ELEC },
    dcCharging:   { label: '급속 충전', type: 'text', applies: ['ev'] },
    length:       { label: '전장', type: 'num', unit: 'mm' },
    width:        { label: '전폭', type: 'num', unit: 'mm' },
    height:       { label: '전고', type: 'num', unit: 'mm' },
    wheelbase:    { label: '휠베이스', type: 'num', unit: 'mm' },
    weight:       { label: '공차 중량', type: 'num', unit: 'kg' },
    trunk:        { label: '트렁크 용량', type: 'num', unit: 'L' },
    fuelTank:     { label: '연료 탱크', type: 'num', unit: 'L', applies: ENG },
    turning:      { label: '최소 회전반경', type: 'num', unit: 'm', dec: 1 },
    tireFront:    { label: '전륜 타이어', type: 'text' },
    tireRear:     { label: '후륜 타이어', type: 'text' },
    suspension:   { label: '서스펜션', type: 'text' },
    /* 편의·옵션 */
    headlamp:         { label: '헤드램프', type: 'equip' },
    adaptiveHighBeam: { label: '어댑티브 상향등', type: 'equip' },
    wheels:           { label: '휠', type: 'equip' },
    panoramaRoof:     { label: '파노라믹 선루프', type: 'equip' },
    acousticGlass:    { label: '어쿠스틱 글래스', type: 'equip' },
    seatMaterial:     { label: '시트 소재', type: 'equip' },
    interiorTrim:     { label: '실내 트림', type: 'equip' },
    ambient:          { label: '앰비언트 라이트', type: 'equip' },
    rooflinerBlack:   { label: '블랙 루프라이너', type: 'equip' },
    heatedSeats:      { label: '열선 시트', type: 'equip' },
    ventSeats:        { label: '통풍 시트', type: 'equip' },
    hud:              { label: '헤드업 디스플레이', type: 'equip' },
    sound:            { label: '오디오 시스템', type: 'equip' },
    arNavi:           { label: '증강현실 내비게이션', type: 'equip' },
    wirelessCarplay:  { label: '무선 CarPlay · Android Auto', type: 'equip' },
    wirelessCharging: { label: '무선 충전', type: 'equip' },
    interiorAssistant:{ label: 'MBUX 인테리어 어시스턴트', type: 'equip' },
    keylessGo:        { label: '키리스 고', type: 'equip' },
    powerTrunk:       { label: '전동 트렁크', type: 'equip' },
    surroundCamera:   { label: '360도 카메라', type: 'equip' },
    parkingAssist:    { label: '주차 어시스트', type: 'equip' },
    rearSteer:        { label: '리어 액슬 스티어링', type: 'equip' },
    /* 안전 */
    drivingAssistPlus:{ label: '드라이빙 어시스턴스 패키지 플러스', type: 'equip' },
    semiAuto:         { label: '반자율 주행 보조', type: 'equip' },
    distronic:        { label: '차간거리 유지 (DISTRONIC)', type: 'equip' },
    laneKeeping:      { label: '차선 유지 보조', type: 'equip' },
    blindSpot:        { label: '사각지대 어시스트', type: 'equip' },
    activeBrake:      { label: '긴급 제동 보조 (Active Brake Assist)', type: 'equip' },
    preSafe:          { label: 'PRE-SAFE®', type: 'equip' },
    activeBonnet:     { label: '액티브 보닛', type: 'equip' },
    airbags:          { label: '에어백', type: 'equip' }
  };
  var CATEGORIES = [
    { key: 'performance', label: '가격·성능', fields: ['price', 'fuel', 'engine', 'displacement', 'power', 'torque', 'systemPower', 'systemTorque', 'motorPower', 'motorTorque', 'drive', 'transmission', 'accel', 'topSpeed'] },
    { key: 'efficiency',  label: '연비·전비', fields: ['fuelCombined', 'fuelCity', 'fuelHighway', 'co2', 'evRange', 'evEfficiency', 'battery', 'acCharging', 'dcCharging'] },
    { key: 'dimensions',  label: '차체·크기', fields: ['length', 'width', 'height', 'wheelbase', 'weight', 'trunk', 'fuelTank', 'turning', 'tireFront', 'tireRear', 'suspension'] },
    { key: 'comfort',     label: '편의·옵션', fields: ['headlamp', 'adaptiveHighBeam', 'wheels', 'panoramaRoof', 'acousticGlass', 'seatMaterial', 'interiorTrim', 'ambient', 'rooflinerBlack', 'heatedSeats', 'ventSeats', 'hud', 'sound', 'arNavi', 'wirelessCarplay', 'wirelessCharging', 'interiorAssistant', 'keylessGo', 'powerTrunk', 'surroundCamera', 'parkingAssist', 'rearSteer'] },
    { key: 'safety',      label: '안전사양', fields: ['drivingAssistPlus', 'semiAuto', 'distronic', 'laneKeeping', 'blindSpot', 'activeBrake', 'preSafe', 'activeBonnet', 'airbags'] }
  ];
  var FUEL = { gasoline: '가솔린', diesel: '디젤', phev: '플러그인 하이브리드 (가솔린)', ev: '전기' };
  var STATUS = { std: '기본', opt: '선택', na: '미적용', check: '확인 필요' };
  var BRAND_ORDER = ['Mercedes-Benz', 'BMW', 'Audi'];

  /* ------------------------------------------------------------------ *
   * 데이터 접근
   * ------------------------------------------------------------------ */
  function store() { return window.MBVC_VEHICLES || {}; }
  function findVehicle(id) {
    var S = store();
    if (!id) return null;
    if (S[id]) return S[id];
    for (var k in S) if (S[k].aliases && S[k].aliases.indexOf(id) > -1) return S[k];
    return null;
  }
  function vid(v) { var S = store(); for (var k in S) if (S[k] === v) return k; return null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* 원시 값 → { state, value, text, note, verify, status }
     state: 'ok' | 'none'(정보 없음) | 'na'(해당 없음) */
  function raw(v, key) {
    var f = FIELDS[key], pt = v.powertrain;
    if (f.applies && f.applies.indexOf(pt) < 0) return { state: 'na' };
    var r;
    if (f.from === 'price') r = v.price;
    else if (f.from === 'meta') r = key === 'fuel' ? (v.fuel || FUEL[pt]) : null;
    else if (f.type === 'equip') r = v.equipment && v.equipment[key];
    else r = v.specs && v.specs[key];
    if (r == null) return { state: 'none' };
    var o = (typeof r === 'object') ? r : (f.type === 'equip' ? { status: r } : { value: r });
    if (f.type === 'equip') {
      if (!o.status && o.text) o.status = 'std';
      return { state: 'ok', status: o.status, text: o.text || '', note: o.note || '', verify: o.status === 'check' || !!o.verify };
    }
    if (o.value == null || o.value === '') return { state: 'none', note: o.note || '', verify: !!o.verify };
    return { state: 'ok', value: o.value, note: o.note || '', verify: !!o.verify };
  }
  function numFmt(n, dec) {
    var s = Number(n).toFixed(dec || 0);
    var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return p.join('.');
  }
  function priceFmt(won) {
    var man = Math.round(won / 10000), eok = Math.floor(man / 10000), rest = man % 10000;
    if (eok > 0) return eok + '억' + (rest ? ' ' + numFmt(rest) + '만원' : '원');
    return numFmt(man) + '만원';
  }
  function display(key, r) {
    var f = FIELDS[key];
    if (r.state === 'na') return '해당 없음';
    if (r.state === 'none') return '정보 없음';
    if (f.type === 'equip') {
      if (r.status === 'check') return '확인 필요';
      if (r.text) return r.status === 'std' ? r.text : r.text + ' (' + (STATUS[r.status] || '') + ')';
      return STATUS[r.status] || r.status;
    }
    if (f.type === 'price') return priceFmt(r.value);
    if (f.type === 'num') return numFmt(r.value, f.dec) + (f.unit ? ' ' + f.unit : '');
    return String(r.value);
  }
  function known(r) { return r.state === 'ok' && !r.verify; }
  function norm(s) { return String(s).toLowerCase().replace(/[\s·・,\-_/()]+/g, ''); }
  /* 같음 여부: 둘 다 확인된 값일 때만 비교. 미확인·확인 필요는 차이로 보지 않음 → null */
  function same(key, a, b) {
    if (!known(a) || !known(b)) return null;
    var f = FIELDS[key];
    if (f.type === 'equip') return a.status === b.status && norm(a.text || '') === norm(b.text || '');
    if (f.type === 'num' || f.type === 'price') return Math.abs(Number(a.value) - Number(b.value)) < 1e-9;
    return norm(a.value) === norm(b.value);
  }
  function delta(key, a, b) {
    var f = FIELDS[key];
    if ((f.type !== 'num' && f.type !== 'price') || !known(a) || !known(b)) return '';
    var d = Number(b.value) - Number(a.value);
    if (!d) return '';
    var sign = d > 0 ? '+' : '−', abs = Math.abs(d);
    return sign + (f.type === 'price' ? priceFmt(abs) : numFmt(abs, f.dec) + (f.unit ? ' ' + f.unit : ''));
  }
  function label(key, v) { var f = FIELDS[key]; return (f.labelBy && v && f.labelBy[v.powertrain]) || f.label; }
  function vName(v) { return v.name + (v.trim && !/미표기/.test(v.trim) ? ' ' + v.trim : ''); }

  /* ------------------------------------------------------------------ *
   * 인스턴스
   * ------------------------------------------------------------------ */
  function Compare(root, opt) {
    this.root = root;
    this.id = 'mbvc' + (++uid);
    this.base = findVehicle(opt.baseModel);
    this.baseId = this.base ? vid(this.base) : null;
    var self = this;
    this.candidates = (opt.compareModels || []).map(function (id) {
      var v = findVehicle(id);
      if (!v && window.console) console.warn('[MercedesCompare] 등록되지 않은 차량 ID — 목록에서 제외합니다:', id);
      return v ? vid(v) : null;
    }).filter(function (id, i, a) { return id && id !== self.baseId && a.indexOf(id) === i; });
    if (!this.candidates.length) {
      Object.keys(store()).forEach(function (k) { if (k !== self.baseId) self.candidates.push(k); });
    }
    var def = findVehicle(opt.defaultCompare);
    this.cmpId = def && this.candidates.indexOf(vid(def)) > -1 ? vid(def) : this.candidates[0];
    this.cat = CATEGORIES[0].key;
    this.diffOnly = false;
    this.listeners = [];
    if (!this.base) { root.innerHTML = '<p class="mbvc-error">기준 차량 데이터를 찾을 수 없습니다: ' + esc(opt.baseModel) + '</p>'; return; }
    this.build();
    this.renderVehicles();
    this.renderTable();
  }
  var P = Compare.prototype;
  P.on = function (el, ev, fn, o) { el.addEventListener(ev, fn, o); this.listeners.push([el, ev, fn, o]); };
  P.destroy = function () {
    this.listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
    this.listeners = []; this.root.innerHTML = ''; this.root.classList.remove('mbvc'); delete this.root.__mbvc;
  };

  P.build = function () {
    var id = this.id, self = this, b = this.base;
    this.root.classList.add('mbvc');
    this.root.innerHTML =
      '<div class="mbvc-cars">' +
        '<div class="mbvc-car mbvc-car--base"><span class="mbvc-car-tag">기준 차량</span>' +
          '<p class="mbvc-car-brand"></p><p class="mbvc-car-name"></p><p class="mbvc-car-trim"></p><p class="mbvc-car-price"></p></div>' +
        '<div class="mbvc-car mbvc-car--cmp"><span class="mbvc-car-tag">비교 차량</span>' +
          '<button type="button" class="mbvc-pick" id="' + id + '-pick" aria-haspopup="listbox" aria-expanded="false" aria-controls="' + id + '-list">' +
            '<span class="mbvc-pick-text"><span class="mbvc-car-brand"></span><span class="mbvc-car-name"></span><span class="mbvc-car-trim"></span></span>' +
            '<span class="mbvc-pick-ico" aria-hidden="true"></span><span class="mbvc-sr">비교 차량 변경</span></button>' +
          '<p class="mbvc-car-price"></p>' +
          '<div class="mbvc-list" id="' + id + '-list" role="listbox" tabindex="-1" aria-label="비교 차량 선택" hidden></div>' +
        '</div>' +
      '</div>' +
      '<div class="mbvc-bar">' +
        '<div class="mbvc-cats" role="tablist" aria-label="비교 카테고리"></div>' +
        '<label class="mbvc-diff"><input type="checkbox" class="mbvc-diff-input"><span class="mbvc-diff-box" aria-hidden="true"></span><span>차이점만 보기</span></label>' +
      '</div>' +
      '<div class="mbvc-table-wrap" role="tabpanel" id="' + id + '-panel">' +
        '<table class="mbvc-table"><caption class="mbvc-sr"></caption>' +
          '<thead><tr><th scope="col" class="mbvc-th-label">비교 항목</th><th scope="col" class="mbvc-th-base"></th><th scope="col" class="mbvc-th-cmp"></th></tr></thead>' +
          '<tbody></tbody></table>' +
        '<p class="mbvc-empty" hidden></p>' +
      '</div>' +
      '<div class="mbvc-rec" hidden></div>' +
      '<div class="mbvc-detail">' +
        '<button type="button" class="mbvc-detail-btn" aria-expanded="false" aria-controls="' + id + '-detail"></button>' +
        '<div class="mbvc-detail-body" id="' + id + '-detail" hidden></div>' +
      '</div>' +
      '<p class="mbvc-note"></p>';
    var q = function (s) { return self.root.querySelector(s); };
    this.el = {
      base: q('.mbvc-car--base'), cmp: q('.mbvc-car--cmp'), pick: q('.mbvc-pick'), list: q('.mbvc-list'),
      cats: q('.mbvc-cats'), diff: q('.mbvc-diff-input'), panel: q('.mbvc-table-wrap'), tbody: q('tbody'),
      thBase: q('.mbvc-th-base'), thCmp: q('.mbvc-th-cmp'), caption: q('caption'), empty: q('.mbvc-empty'),
      rec: q('.mbvc-rec'), dBtn: q('.mbvc-detail-btn'), dBody: q('.mbvc-detail-body'), note: q('.mbvc-note')
    };
    /* 카테고리 탭 */
    this.el.cats.innerHTML = CATEGORIES.map(function (c, i) {
      return '<button type="button" role="tab" class="mbvc-cat" id="' + id + '-tab-' + c.key + '" data-cat="' + c.key + '" aria-controls="' + id + '-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(c.label) + '</button>';
    }).join('');
    this.el.panel.setAttribute('aria-labelledby', id + '-tab-' + CATEGORIES[0].key);
    var tabs = [].slice.call(this.el.cats.querySelectorAll('.mbvc-cat'));
    tabs.forEach(function (t, i) {
      self.on(t, 'click', function () { self.setCat(t.getAttribute('data-cat'), true); });
      self.on(t, 'keydown', function (e) {
        var d = { ArrowRight: 1, ArrowLeft: -1 }[e.key], n = null;
        if (d) n = tabs[(i + d + tabs.length) % tabs.length];
        else if (e.key === 'Home') n = tabs[0]; else if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); n.focus(); self.setCat(n.getAttribute('data-cat'), true); }
      });
    });
    this.on(this.el.diff, 'change', function () { self.diffOnly = self.el.diff.checked; self.renderTable(); });
    /* 비교 차량 목록 */
    this.buildList();
    this.on(this.el.pick, 'click', function () { self.toggleList(); });
    this.on(this.el.pick, 'keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); self.openList(); } });
    this.on(document, 'click', function (e) { if (!self.el.cmp.contains(e.target)) self.closeList(); });
    /* 전체 제원 펼치기 */
    this.el.dBtn.innerHTML = '<span>' + esc(b.short || b.name) + ' 전체 제원 보기</span><span class="mbvc-plus" aria-hidden="true"></span>';
    this.on(this.el.dBtn, 'click', function () {
      var open = self.el.dBtn.getAttribute('aria-expanded') !== 'true';
      self.el.dBtn.setAttribute('aria-expanded', String(open));
      if (open && !self._detailBuilt) { self.renderDetail(); self._detailBuilt = true; }
      self.el.dBody.hidden = !open;
    });
    var meta = window.MBVC_DATA_META || {};
    this.el.note.innerHTML = '가격·제원은 각 모델 페이지와 공식 자료 기준' + (meta.checked ? ' (확인일 ' + esc(meta.checked) + ')' : '') +
      '이며, 실제 판매 조건·옵션에 따라 달라질 수 있습니다. <b>확인 필요</b>는 자료 간 수치가 다르거나 공식 확인 전인 항목으로 차이 비교에서 제외됩니다. ' +
      '수치 차이는 우열이 아닌 차이만 표시합니다. 단위 기준: 출력 ps(1 kW = 1.36 ps) · 토크 kg·m(1 kg·m = 9.81 Nm) · 연비 km/L · 전비 km/kWh.';
  };

  P.buildList = function () {
    var self = this, id = this.id, S = store(), groups = {};
    this.candidates.forEach(function (k) { var b = S[k].brand || '기타'; (groups[b] = groups[b] || []).push(k); });
    var brands = Object.keys(groups).sort(function (a, b) {
      var ia = BRAND_ORDER.indexOf(a), ib = BRAND_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    var n = 0, html = '';
    brands.forEach(function (br) {
      html += '<div class="mbvc-group" role="group" aria-label="' + esc(br) + '"><p class="mbvc-group-title" aria-hidden="true">' + esc(br) + '</p>';
      groups[br].forEach(function (k) {
        var v = S[k];
        html += '<div class="mbvc-opt" role="option" id="' + id + '-opt-' + (n++) + '" data-id="' + esc(k) + '" aria-selected="false">' +
          '<span class="mbvc-opt-name">' + esc(vName(v)) + '</span>' +
          '<span class="mbvc-opt-price">' + (v.price && v.price.value ? esc(priceFmt(v.price.value)) : '가격 정보 없음') + '</span></div>';
      });
      html += '</div>';
    });
    this.el.list.innerHTML = html;
    this.opts = [].slice.call(this.el.list.querySelectorAll('.mbvc-opt'));
    this.opts.forEach(function (o) {
      self.on(o, 'click', function () { self.choose(o.getAttribute('data-id')); });
      self.on(o, 'mousemove', function () { self.activate(self.opts.indexOf(o)); });
    });
    this.on(this.el.list, 'keydown', function (e) {
      var i = self._active == null ? 0 : self._active;
      if (e.key === 'ArrowDown') { e.preventDefault(); self.activate(Math.min(i + 1, self.opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); self.activate(Math.max(i - 1, 0)); }
      else if (e.key === 'Home') { e.preventDefault(); self.activate(0); }
      else if (e.key === 'End') { e.preventDefault(); self.activate(self.opts.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.choose(self.opts[i].getAttribute('data-id')); }
      else if (e.key === 'Escape' || e.key === 'Tab') { self.closeList(e.key === 'Escape'); }
    });
  };
  P.activate = function (i) {
    if (i < 0 || !this.opts[i]) return;
    this._active = i;
    this.opts.forEach(function (o, j) { o.classList.toggle('is-active', j === i); });
    this.el.list.setAttribute('aria-activedescendant', this.opts[i].id);
    var o = this.opts[i], l = this.el.list;
    if (o.offsetTop < l.scrollTop) l.scrollTop = o.offsetTop - 8;
    else if (o.offsetTop + o.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = o.offsetTop + o.offsetHeight - l.clientHeight + 8;
  };
  P.openList = function () {
    if (!this.el.list.hidden) return;
    this.el.list.hidden = false; this.el.pick.setAttribute('aria-expanded', 'true'); this.root.classList.add('is-picking');
    var cur = this.opts.map(function (o) { return o.getAttribute('data-id'); }).indexOf(this.cmpId);
    this.activate(cur < 0 ? 0 : cur);
    this.el.list.focus({ preventScroll: true });
  };
  P.closeList = function (focusBtn) {
    if (this.el.list.hidden) return;
    this.el.list.hidden = true; this.el.pick.setAttribute('aria-expanded', 'false'); this.root.classList.remove('is-picking');
    if (focusBtn) this.el.pick.focus({ preventScroll: true });
  };
  P.toggleList = function () { if (this.el.list.hidden) this.openList(); else this.closeList(); };
  P.choose = function (k) {
    this.closeList(true);
    if (k === this.cmpId) return;
    this.cmpId = k;
    this.renderVehicles();
    this.renderTable();
    if (this._detailBuilt && this.el.dBody.hidden === false) { /* 기준 차량 상세는 변하지 않음 */ }
  };
  P.setCat = function (key) {
    if (key === this.cat) return;
    this.cat = key;
    var id = this.id;
    [].forEach.call(this.el.cats.querySelectorAll('.mbvc-cat'), function (t) {
      var on = t.getAttribute('data-cat') === key;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if (on && t.scrollIntoView && t.parentNode.scrollWidth > t.parentNode.clientWidth) {
        var p = t.parentNode, l = t.offsetLeft - p.offsetLeft;
        p.scrollTo({ left: Math.max(0, l - (p.clientWidth - t.offsetWidth) / 2), behavior: 'smooth' });
      }
    });
    this.el.panel.setAttribute('aria-labelledby', id + '-tab-' + key);
    this.renderTable();
  };

  P.fillCar = function (box, v) {
    var q = function (s) { return box.querySelector(s); };
    q('.mbvc-car-brand').textContent = v.brand || '';
    q('.mbvc-car-name').textContent = v.name || '';
    q('.mbvc-car-trim').textContent = v.trim || '';
    var pr = q('.mbvc-car-price');
    pr.textContent = v.price && v.price.value ? priceFmt(v.price.value) : '가격 정보 없음';
    pr.classList.toggle('is-none', !(v.price && v.price.value));
  };
  P.renderVehicles = function () {
    var S = store(), c = S[this.cmpId];
    this.fillCar(this.el.base, this.base);
    if (c) this.fillCar(this.el.cmp, c);
    var self = this;
    this.opts.forEach(function (o) { o.setAttribute('aria-selected', String(o.getAttribute('data-id') === self.cmpId)); });
    this.el.thBase.innerHTML = '<span class="mbvc-th-tag">기준</span>' + esc(this.base.short || this.base.name);
    this.el.thCmp.innerHTML = '<span class="mbvc-th-tag">비교</span>' + esc(c ? (c.short || c.name) : '');
    this.renderRec();
  };

  P.rows = function (catKey) {
    var a = this.base, b = store()[this.cmpId], cat = null;
    CATEGORIES.forEach(function (c) { if (c.key === catKey) cat = c; });
    return cat.fields.map(function (k) {
      var ra = raw(a, k), rb = b ? raw(b, k) : { state: 'none' };
      return { key: k, a: ra, b: rb, same: same(k, ra, rb), label: label(k, a.powertrain === b.powertrain ? a : (a.powertrain === 'phev' ? a : b)) };
    }).filter(function (r) {
      if (r.a.state === 'na' && r.b.state === 'na') return false;                 // 두 차량 모두 해당 없음
      if (r.a.state !== 'ok' && r.b.state !== 'ok' && !r.a.verify && !r.b.verify) return false; // 두 차량 모두 데이터 없음
      return true;
    });
  };
  P.cell = function (key, r, d) {
    var cls = 'mbvc-v', txt = display(key, r), html = '';
    if (r.state !== 'ok' || r.status === 'check') cls += ' is-muted';
    if (FIELDS[key].type === 'equip' && r.status === 'na') cls += ' is-na';
    html = '<span class="' + cls + '">' + esc(txt) + '</span>';
    if (r.verify && !(FIELDS[key].type === 'equip' && r.status === 'check')) html += '<span class="mbvc-flag">확인 필요</span>';
    if (d) html += '<span class="mbvc-delta" title="기준 차량 대비 차이">' + esc(d) + '</span>';
    if (r.note) html += '<span class="mbvc-sub">' + esc(r.note) + '</span>';
    return html;
  };
  P.renderTable = function () {
    var self = this, rows = this.rows(this.cat), out = [], shown = 0;
    rows.forEach(function (r) {
      var diff = r.same === false;
      if (self.diffOnly && !diff) return;
      shown++;
      out.push('<tr class="' + (diff ? 'is-diff' : '') + '"><th scope="row" class="mbvc-label">' + esc(r.label) +
        (diff ? '<span class="mbvc-dot" title="차이 있음" aria-label="차이 있음"></span>' : '') + '</th>' +
        '<td class="mbvc-base" data-car="기준">' + self.cell(r.key, r.a, '') + '</td>' +
        '<td class="mbvc-cmp" data-car="비교">' + self.cell(r.key, r.b, delta(r.key, r.a, r.b)) + '</td></tr>');
    });
    this.el.tbody.innerHTML = out.join('');
    var catLabel = ''; CATEGORIES.forEach(function (c) { if (c.key === self.cat) catLabel = c.label; });
    var c = store()[this.cmpId];
    this.el.caption.textContent = catLabel + ' 비교: ' + vName(this.base) + ' 대 ' + (c ? vName(c) : '');
    this.el.empty.hidden = shown > 0;
    this.el.empty.textContent = this.diffOnly ? '이 카테고리에서 두 차량 모두 확인된 항목 중 차이가 있는 항목이 없습니다.' : '이 카테고리에 등록된 데이터가 없습니다.';
    this.root.querySelector('.mbvc-table').hidden = shown === 0;
  };
  P.renderRec = function () {
    var c = store()[this.cmpId], cars = [this.base, c].filter(function (v) { return v && v.recommend && v.recommend.length; });
    this.el.rec.hidden = !cars.length;
    this.el.rec.innerHTML = cars.length ? '<p class="mbvc-rec-title">이런 고객에게 추천합니다</p><div class="mbvc-rec-grid">' + cars.map(function (v) {
      return '<div class="mbvc-rec-card"><p class="mbvc-rec-name">' + esc(vName(v)) + '</p><ul>' + v.recommend.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>';
    }).join('') + '</div>' : '';
  };
  /* 기준 차량 전체 제원 — 비교표와 같은 데이터에서 생성 */
  P.renderDetail = function () {
    var v = this.base, html = '';
    CATEGORIES.forEach(function (c) {
      var items = c.fields.map(function (k) { return { k: k, r: raw(v, k) }; }).filter(function (x) { return x.r.state === 'ok' || x.r.verify; });
      if (!items.length) return;
      html += '<div class="mbvc-dgroup"><p class="mbvc-dtitle">' + esc(c.label) + '</p><dl>' + items.map(function (x) {
        return '<div class="mbvc-drow"><dt>' + esc(label(x.k, v)) + '</dt><dd>' + esc(display(x.k, x.r)) +
          (x.r.verify && x.r.status !== 'check' ? ' <span class="mbvc-flag">확인 필요</span>' : '') +
          (x.r.note ? '<span class="mbvc-sub">' + esc(x.r.note) + '</span>' : '') + '</dd></div>';
      }).join('') + '</dl></div>';
    });
    var src = v.source || {};
    html += '<p class="mbvc-dsrc">출처: ' + esc(src.note || src.page || '') + (src.checked ? ' · 확인일 ' + esc(src.checked) : '') + '</p>';
    this.el.dBody.innerHTML = html;
  };

  /* ------------------------------------------------------------------ *
   * 공개 API
   * ------------------------------------------------------------------ */
  function list(v) { return v ? String(v).split(',').map(function (s) { return s.trim(); }).filter(Boolean) : []; }
  function mountOne(el, opt) {
    if (el.__mbvc) return el.__mbvc;          // 중복 초기화 방지
    var o = {
      baseModel: opt.baseModel || el.getAttribute('data-base-model'),
      compareModels: opt.compareModels || list(el.getAttribute('data-compare-models')),
      defaultCompare: opt.defaultCompare || el.getAttribute('data-default-compare')
    };
    var inst = new Compare(el, o);
    el.__mbvc = inst;
    return inst;
  }
  function init(opt) {
    opt = opt || {};
    var c = opt.container || '.mbvc-container', els;
    if (typeof c === 'string') els = [].slice.call(document.querySelectorAll(c));
    else if (c && c.nodeType === 1) els = [c];
    else els = [].slice.call(c || []);
    return els.map(function (el) { return mountOne(el, opt); });
  }
  function register(vehicles) {
    var S = window.MBVC_VEHICLES = window.MBVC_VEHICLES || {};
    for (var k in vehicles) if (Object.prototype.hasOwnProperty.call(vehicles, k)) S[k] = vehicles[k];
  }
  function autoInit() {
    [].forEach.call(document.querySelectorAll('.mbvc-container[data-base-model]'), function (el) {
      if (!el.hasAttribute('data-mbvc-manual')) mountOne(el, {});
    });
  }

  window.MercedesCompare = {
    version: VERSION, init: init, register: register,
    get: function (id) { return findVehicle(id); },
    fields: FIELDS, categories: CATEGORIES
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
})(window, document);
