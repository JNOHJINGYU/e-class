/* ==========================================================================
   E-Class Plug-in Hybrid — 공통 데이터 파일 (vehicle-data.js)
   --------------------------------------------------------------------------
   hybrid.html / e350e.html / e53.html 세 페이지가 모두 이 파일을 읽습니다.
   ▶ 제원 · 가격 · 옵션 · 이미지 URL은 "이 파일 한 곳"에서만 수정하세요.
   ▶ 세 HTML 파일과 같은 폴더에 두어야 합니다.

   [값 입력 규칙]
   - value : 화면에 표시할 값. 아직 확정되지 않았으면 null
   - verify: true 이면 "확인 필요" 배지가 붙습니다 (SHOW_VERIFY_BADGES가 true일 때)
   - note  : 값 아래 작게 표시되는 보조 설명 (측정 기준 등)
   - _check: 내부 확인용 메모. 화면에는 표시되지 않습니다.
   ========================================================================== */

/* 데이터 확정 후 false 로 바꾸면 화면의 "확인 필요" 배지가 모두 사라집니다.
   (false 상태에서 value가 null인 항목은 "상담 시 안내"로 표시됩니다) */
const SHOW_VERIFY_BADGES = true;

const DATA_BASIS = 'MB 어프로치 / 공식 카탈로그 기준 · MY26 · 2026.01 가격표';

/* ==========================================================================
   이미지 URL 관리 영역
   - https://... 또는 images/파일명.jpg 형태로 입력
   - 비워두면 레이아웃이 유지된 채 "이미지 준비 중" 영역으로 표시됩니다
   - GitHub 이미지는 반드시 raw.githubusercontent.com 주소를 사용하세요.
     github.com/.../blob/main/파일?raw=true 주소는 github.com에서 2번 리다이렉트된 뒤
     같은 파일에 도착하므로, 이미지마다 요청이 3번 오가 첫 표시가 늦어집니다.
       (X) https://github.com/JNOHJINGYU/images/blob/main/파일명.jpg?raw=true
       (O) https://raw.githubusercontent.com/JNOHJINGYU/images/main/파일명.jpg
   ========================================================================== */
const GH_IMG = 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/';

/* ▶ WebP 스위치 (메인 페이지 hybrid.html 이미지)
   false : 기존 JPG를 사용합니다.
   true  : 아래 webp 파일을 사용합니다. (2026.11.10 images 저장소 업로드·접근 확인 완료 — 현재 사용 중)
           → images 저장소에 WebP 10개를 업로드하고, 주소가 열리는 것을 확인한 뒤에만 true로 바꾸세요.
             (업로드 전에 true로 바꾸면 이미지가 "이미지 준비 중"으로 표시됩니다) */
const USE_WEBP = true;
const pickImg = (jpg, webp) => GH_IMG + (USE_WEBP && webp ? webp : jpg);

const E53_PHOTO = GH_IMG + 'Mercedes-Benz-E53_AMG_Hybrid-2025-1280-884184b31620baccde7022ed1083298d80.jpg'; // 1280×960 · 113KB

const IMAGE_LINKS = {
  main: {
    /* HERO — hybrid.html <head>에서 가장 먼저(preload) 요청됩니다 */
    hero: pickImg('eclass-phev-hero-cutaway.jpg', 'eclass-phev-hero-cutaway.webp'),     // JPG 1672×941 331KB → WebP 1672px 176KB
    heroMobile: USE_WEBP ? GH_IMG + 'eclass-phev-hero-cutaway-1080.webp' : '',           // 모바일(767px 이하) 전용 · WebP 1080px 82KB · 비워두면 hero 사용
    heroSize: [1672, 941],     // 히어로 원본 가로×세로 (레이아웃 이동 방지용)

    /* SECTION 02 투시도 (1장) — 글자 라벨이 있어 원본 해상도 유지 */
    phevCutaway: pickImg('e350e-phev-cutaway-labeled.jpg', 'e350e-phev-cutaway-labeled.webp'), // JPG 1448×1086 419KB → WebP 1448px 185KB
    phevCutawaySmall: USE_WEBP ? GH_IMG + 'e350e-phev-cutaway-labeled-800.webp' : '',            // 작은 화면용 WebP 800px 92KB (확대 모달은 항상 큰 이미지)

    /* SECTION 04 — 카드 표시 폭 약 290px(PC 4열) · 레티나 2배 기준 800px */
    whyQuiet: pickImg('e-phev-mode-electric.jpg', 'e-phev-mode-electric-800.webp'),          // 01 전기 주행   JPG 343KB → WebP 57KB
    whyRange: pickImg('e-phev-mode-gasoline.jpg', 'e-phev-mode-gasoline-800.webp'),          // 02 가솔린 주행 JPG 322KB → WebP 51KB
    whyEfficiency: pickImg('e-phev-mode-hybrid.jpg', 'e-phev-mode-hybrid-800.webp'),         // 03 하이브리드  JPG 316KB → WebP 51KB
    whyResponse: pickImg('e-phev-mode-acceleration.jpg', 'e-phev-mode-acceleration-800.webp'), // 04 가속 주행  JPG 397KB → WebP 69KB

    /* SECTION 05 라인업 카드 — 표시 폭 약 580px(PC 2열) · 레티나 기준 1200px */
    cardE350e: pickImg('e350e-phev-home-charging.jpg', 'e350e-phev-home-charging-1200.webp'), // JPG 323KB → WebP 110KB
    cardE53: pickImg('Mercedes-Benz-E53_AMG_Hybrid-2025-1280-884184b31620baccde7022ed1083298d80.jpg', 'e53-amg-hybrid-card-1200.webp'), // JPG 113KB → WebP 43KB
  },
  e350e: {
    hero: GH_IMG + 'e350e-hero-residence.jpg',   // 1448×1086 · 357KB (e350e 페이지 — 이번 WebP 변환 범위 밖)
    price: '',                 // PRICE 섹션 외관 이미지 — 비워두면 main.cardE350e(라인업 카드) 이미지 사용
    electric: '',
    charging: '',
    comfort: '',
    design: [
      { src: '', caption: '외관 — 전면' },
      { src: '', caption: '외관 — 측면' },
      { src: '', caption: '실내 — 대시보드' },
      { src: '', caption: '실내 — 시트' },
    ],
  },
  e53: {
    // ※ E53 히어로 이미지는 로딩 속도(LCP)를 위해 e53.html의 <picture>에 직접 들어 있습니다.
    //   아래 값은 기록용이며, 히어로 이미지를 바꿀 때는 e53.html의 <picture> 주소를 수정하세요.
    hero: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-hero-studio.webp',              // PC 1672px (55KB)
    heroSmall: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-hero-studio-960.webp',     // PC 960px (23KB)
    heroMobile: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-hero-mobile.webp',        // 모바일 세로형 941×1672 (80KB)
    heroMobileSmall: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-hero-mobile-640.webp', // 모바일 640px (41KB)
    engine: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-amg-engine.webp',          // AMG ENGINE 섹션 · 1536px WebP (175KB)
    engineSmall: 'https://raw.githubusercontent.com/JNOHJINGYU/images/main/e53-amg-engine-800.webp', // 800px WebP (60KB) — 작은 화면용
    design: [
      { src: E53_PHOTO, caption: '외관 — AMG 디자인' },
      { src: '', caption: '외관 — 리어' },
      { src: '', caption: '실내 — AMG 퍼포먼스 스티어링 휠' },
      { src: '', caption: '실내 — 시트' },
    ],
  },
};

/* ==========================================================================
   차량 데이터 (VEHICLE_DATA)
   ========================================================================== */
const VEHICLE_DATA = {

  /* ------------------------------------------------------------------------
     E 350 e 4MATIC
     ------------------------------------------------------------------------ */
  e350e: {
    modelName: 'E 350 e 4MATIC',
    trimName: 'E 350 e 4MATIC EXCLUSIVE',
    page: 'e350e.html',

    price: {
      label: '국내 판매 가격', value: '101,100,000원', verify: false,
      asOf: '2026.07.01 갱신 옵션표 기준',   // 가격 적용 시점 (화면에 함께 표시)
      _check: '2026.11.08 사용자 확인 판매가 101,100,000원 (이전 표기: 1억원)',
    },

    /* 상세 제원 — 2026.11 웹 검증
       출처 A: 메르세데스-벤츠 코리아 26.07.01 갱신 옵션표 (E 350 e 4M EX, 딜러 자료)
       출처 B: 국내 출시 보도 (2024.12.18, 제이슨류닷넷 등) / 출처 C: 국내 인증 보도 (2024.10, 엠투데이·유카포스트)
       verify: true = 공식 자료 간 불일치 또는 미확인 → 화면에 '확인 필요' 표시 */
    specs: {
      engine:        { label: '엔진', value: '직렬 4기통 가솔린 터보 (M254) + 전기모터' },
      displacement:  { label: '배기량', value: '1,999 cc' },                                   // A·B
      enginePower:   { label: '엔진 최고출력', value: '204 ps', note: '6,100 rpm' },            // 출력 A·B, rpm A
      engineTorque:  { label: '엔진 최대토크', value: '32.6 kg·m', note: '2,000–4,000 rpm' },   // 토크 A·B, rpm A
      motorPower:    { label: '전기모터 출력', value: '95 kW / 129 ps' },                       // A·B
      motorTorque:   { label: '전기모터 최대토크', value: '44.9 kg·m', note: '440 Nm' },         // A·B
      systemPower:   { label: '시스템 출력', value: '313 마력' },                               // A·C (제조사 발표 합산값)
      systemTorque:  { label: '시스템 토크', value: '56.1 kg·m', note: '550 Nm' },              // A·B·C
      battery:       { label: '고전압 배터리 용량', value: '25.4 kWh', verify: true,
                       _check: 'A·B·C 모두 25.4 kWh. 총용량/가용용량 구분은 국내 공식 자료에 미표기 — 구분 확인 후 verify:false' },
      evRange:       { label: '전기 주행거리', value: '77 km', note: '1회 충전 · 국내 인증' },   // A·B·C
      evEfficiency:  { label: '전기 복합전비', value: '3.1 km/kWh', note: '도심 2.9 · 고속 3.4' }, // A·B·C
      fuelEconomy:   { label: '복합연비 (내연)', value: '11.1 km/L', note: '도심 10.0 · 고속 12.7' }, // A·B·C
      co2:           { label: 'CO₂ 배출량', value: '27 g/km' },                                 // B
      acceleration:  { label: '0–100 km/h', value: '6.6 초', verify: true,
                       _check: 'A(MY26 옵션표) 6.6초 / C(2024.10 인증 보도) 6.4초 — 국내 공식 제원표로 확정 필요' },
      topSpeed:      { label: '최고속도', value: '234 km/h', verify: true,
                       _check: 'A(MY26 옵션표) 234 km/h 외 국내 공식 자료 미확인' },
      drive:         { label: '구동방식', value: '4MATIC 사륜구동' },                          // A·B
      transmission:  { label: '변속기', value: '9G-TRONIC 자동 9단' },                        // A·B
      suspension:    { label: '서스펜션', value: '컴포트 서스펜션' },
      size:          { label: '전장 × 전폭 × 전고', value: '4,955 × 1,880 × 1,480 mm' },        // A·B
      wheelbase:     { label: '축거', value: '2,960 mm' },                                      // A·B
      weight:        { label: '공차중량', value: '2,215 kg' },                                  // A·B
      trunk:         { label: '트렁크 용량', value: '370 L' },                                  // A·C
      fuelTank:      { label: '연료탱크', value: '50 L' },                                      // A·B
      tires:         { label: '타이어', value: '앞 245/45 R19 · 뒤 275/40 R19' },              // B
      acCharging:    { label: 'AC 완속 충전', value: null, verify: true,
                       _check: '국내 사양 온보드 충전기 출력·충전시간 공식 자료 미확인 (해외 사양 수치 적용 금지)' },
    },

    specGroups: [
      { title: '파워트레인', keys: ['engine', 'displacement', 'enginePower', 'engineTorque', 'motorPower', 'motorTorque', 'systemPower', 'systemTorque', 'drive', 'transmission'] },
      { title: '배터리 · 충전', keys: ['battery', 'evRange', 'evEfficiency', 'acCharging'] },
      { title: '성능 · 효율', keys: ['acceleration', 'topSpeed', 'fuelEconomy', 'co2'] },
      { title: '차체 · 섀시', keys: ['size', 'wheelbase', 'weight', 'trunk', 'fuelTank', 'suspension', 'tires'] },
    ],

    /* 카테고리 · icon: e350e.html 기본 사양 카드 아이콘 키 */
    equipmentCategories: [
      { id: 'exterior', label: '외장 및 디자인',          icon: 'design' },
      { id: 'interior', label: '실내 및 시트',            icon: 'seat' },
      { id: 'info',     label: '편의 및 인포테인먼트',    icon: 'display' },
      { id: 'assist',   label: '주행 및 주차 보조',       icon: 'drive' },
      { id: 'safety',   label: '안전 및 보호 시스템',     icon: 'shield' },
      { id: 'etc',      label: '오디오 및 기타 편의 장비', icon: 'audio' },
    ],

    /* 기본 사양 — E 350 e 4MATIC EX 옵션표(26.07.01 갱신) 기준
       name: 목록에 표시 · sub: 이름 옆 작은 보조 표기 · desc: 상세 모달 설명 · img: 상세 이미지 URL */
    standardEquipment: [
      { cat: 'exterior', name: 'EXCLUSIVE 디자인', desc: '크롬 디테일 중심의 클래식한 EXCLUSIVE 외관 구성입니다.', img: '' },
      { cat: 'exterior', name: '디지털 라이트', desc: '고해상도 헤드램프가 주변 상황에 맞춰 배광을 조절합니다.', img: '' },
      { cat: 'exterior', name: '어댑티브 하이빔 어시스트 플러스', desc: '상향등을 유지하면서 앞차·마주 오는 차의 눈부심을 줄이도록 조사 영역을 제어합니다.', img: '' },
      { cat: 'exterior', name: '19인치 5-스포크 휠', sub: 'R82', desc: '19인치 5-스포크 디자인 휠이 기본 적용됩니다.', img: '' },
      { cat: 'exterior', name: '발광 라디에이터 그릴', sub: '26+', desc: '라디에이터 그릴 테두리에 조명이 들어오는 사양입니다. 옵션표에 (26+)로 표기되어 있습니다.', img: '' },
      { cat: 'exterior', name: '브랜드 프로젝션 로고', desc: '도어를 열 때 바닥에 브랜드 로고를 비춥니다.', img: '' },
      { cat: 'exterior', name: '액티브 앰비언트 라이트', desc: '실내 조명이 주행 정보·기능과 연동되어 반응합니다.', img: '' },

      { cat: 'interior', name: '천연 가죽 시트', desc: '천연 가죽으로 마감한 시트가 적용됩니다.', img: '' },
      { cat: 'interior', name: '앞좌석 메모리 · 열선 · 통풍 시트', desc: '계절에 맞는 온도 관리와 운전 자세 저장 기능을 제공합니다.', img: '' },
      { cat: 'interior', name: '뒷좌석 열선 · ISOFIX · 접이식 시트', desc: '뒷좌석 열선과 유아용 시트 고정 장치, 접이식 구조를 갖췄습니다.', img: '' },
      { cat: 'interior', name: '나파 가죽 터치 컨트롤 스티어링 휠', sub: '시프트 패들 · 열선', desc: '신형 나파 가죽 스티어링 휠에 터치 컨트롤과 시프트 패들, 열선이 적용됩니다.', img: '' },
      { cat: 'interior', name: '브라운 오픈 포어 메이플 우드 알루미늄 라인 트림', sub: '센터콘솔 포함', desc: '나뭇결이 살아 있는 메이플 우드에 알루미늄 라인을 더한 트림입니다.', img: '' },
      { cat: 'interior', name: '나파 룩 ARTICO 대시보드', desc: '나파 룩 ARTICO 인조가죽으로 대시보드를 마감했습니다.', img: '' },
      { cat: 'interior', name: '열 · 소음 차단 글래스', desc: '열과 외부 소음의 유입을 줄여 실내를 쾌적하고 조용하게 유지합니다.', img: '' },

      { cat: 'info', name: '12.3인치 계기판 + 3세대 MBUX 14.4인치 디스플레이', desc: '운전 정보와 미디어 화면을 각각의 대형 디스플레이로 제공합니다.', img: '' },
      { cat: 'info', name: 'MBUX 증강현실 내비게이션', desc: '카메라 영상 위에 진행 방향을 겹쳐 보여줍니다.', img: '' },
      { cat: 'info', name: '헤드업 디스플레이', desc: '주요 주행 정보를 운전자 시선 앞쪽에 띄웁니다.', img: '' },
      { cat: 'info', name: '앞좌석 스마트폰 무선 충전', desc: '스마트폰을 거치하면 무선으로 충전됩니다.', img: '' },
      { cat: 'info', name: '무선 Apple CarPlay · Android Auto', desc: '케이블 없이 스마트폰을 연결합니다.', img: '' },
      { cat: 'info', name: 'Mercedes me connect', sub: '사전 온도 조절 · 디지털 차량 키', desc: '스마트폰으로 탑승 전 실내 온도를 맞추고 디지털 차량 키를 사용할 수 있습니다.', img: '' },

      { cat: 'assist', name: '드라이빙 어시스턴스 패키지 플러스', sub: 'P20', desc: '차간거리·차선 유지 등 주행 보조 기능을 묶은 패키지입니다.', img: '' },
      { cat: 'assist', name: '액티브 디스턴스 어시스트 DISTRONIC', desc: '앞차와의 거리를 유지하며 속도를 자동으로 조절합니다.', img: '' },
      { cat: 'assist', name: '스티어링 어시스트', desc: '차선 중앙을 유지하도록 조향을 보조합니다.', img: '' },
      { cat: 'assist', name: '능동형 차선 유지 어시스트', desc: '의도하지 않은 차선 이탈을 경고하고 복귀를 보조합니다.', img: '' },
      { cat: 'assist', name: '능동형 사각지대 어시스트 + 출구 경고 어시스트', desc: '측후방 사각지대 차량을 알려주고, 하차 시 접근하는 차량·자전거를 경고합니다.', img: '' },
      { cat: 'assist', name: '경로 기반 속도 조절', desc: '내비게이션 경로의 커브·교차로 등을 반영해 속도를 조절합니다.', img: '' },
      { cat: 'assist', name: '능동형 속도 제한 어시스트', desc: '인식한 제한 속도를 주행 속도 설정에 반영합니다.', img: '' },
      { cat: 'assist', name: '액티브 브레이크 어시스트', sub: '교차로 기능 포함', desc: '충돌 위험을 감지하면 경고하고 제동을 보조합니다.', img: '' },
      { cat: 'assist', name: '긴급 회피 조향 어시스트', sub: 'Evasive Steering Assist', desc: '운전자가 장애물을 피하려고 조향할 때 조향을 보조합니다.', img: '' },
      { cat: 'assist', name: '어댑티브 브레이크', sub: 'HOLD 기능', desc: '정차 시 브레이크 페달에서 발을 떼도 차량을 정지 상태로 유지할 수 있습니다.', img: '' },
      { cat: 'assist', name: '서라운드 카메라 + 액티브 주차 어시스트', desc: '차량 주변 영상을 보여주고 주차 조작을 보조합니다.', img: '' },
      { cat: 'assist', name: '어질리티 컨트롤 서스펜션', sub: 'Comfort', desc: '편안함 중심으로 세팅한 서스펜션입니다.', img: '' },
      { cat: 'assist', name: '9G-TRONIC 자동변속기', desc: '전기모터와 엔진의 동력을 9단 변속기가 매끄럽게 이어줍니다.', img: '' },
      { cat: 'assist', name: '서머 타이어', sub: 'TIREFIT', desc: '서머 타이어와 타이어 수리 키트(TIREFIT)가 적용됩니다.', img: '' },

      { cat: 'safety', name: 'PRE-SAFE® · PRE-SAFE® Sound · PRE-SAFE® PLUS · PRE-SAFE® Impulse Side', desc: '충돌 위험 상황에서 탑승자 보호 조치를 미리 준비합니다.', img: '' },
      { cat: 'safety', name: '에어백 11개', sub: '운전석·동반석 / 무릎 / 센터 / 사이드(앞·뒤) / 윈도우', desc: '운전석·동반석, 무릎(운전석·동반석), 센터, 사이드(운전석·동반석·뒷좌석 좌우), 윈도우(좌·우) 에어백이 적용됩니다.', img: '' },
      { cat: 'safety', name: '액티브 보닛', desc: '보행자 충돌 시 보닛을 들어 올려 충격을 줄이도록 돕습니다.', img: '' },
      { cat: 'safety', name: 'ATTENTION ASSIST', desc: '운전자의 피로 징후를 감지해 휴식을 권합니다.', img: '' },
      { cat: 'safety', name: 'ABS · ESP®', desc: '제동 시 바퀴 잠김을 막고 차체 자세를 안정적으로 제어합니다.', img: '' },
      { cat: 'safety', name: '어댑티브 브레이크 라이트', sub: 'Flashing', desc: '급제동 시 브레이크등이 점멸해 뒤차에 알립니다.', img: '' },
      { cat: 'safety', name: '어쿠스틱 앰비언트 프로텍션', desc: '옵션표 안전 사양에 포함된 항목입니다.', img: '' },

      { cat: 'etc', name: 'Burmester® 4D 서라운드 사운드 시스템', sub: '730W · 17 스피커', desc: '시트에 내장된 진동 기능까지 더한 입체 사운드 시스템입니다.', img: '' },
      { cat: 'etc', name: '파노라마 선루프', desc: '앞·뒷좌석까지 이어지는 넓은 글라스 루프로 개방감을 더합니다.', img: '' },
      { cat: 'etc', name: '2존 에어컨디셔너 & 공기청정 패키지', desc: '운전석·동반석 온도를 따로 설정하고 실내 공기를 정화합니다.', img: '' },
      { cat: 'etc', name: '플러시 도어 핸들 + KEYLESS-GO', desc: '차체에 매립된 도어 핸들과 스마트키 기반 잠금 해제·시동 기능입니다.', img: '' },
      { cat: 'etc', name: '전동식 트렁크 + 핸즈프리 액세스', desc: '발 동작으로 트렁크를 열고 닫을 수 있습니다.', img: '' },
      { cat: 'etc', name: '벤츠 순정형 블랙박스 & 하이패스', desc: '순정형 블랙박스와 하이패스가 기본 장착됩니다.', img: '' },
    ],
    optionalEquipment: [],
  },

  /* ------------------------------------------------------------------------
     Mercedes-AMG E 53 HYBRID 4MATIC+
     ------------------------------------------------------------------------ */
  e53: {
    modelName: 'Mercedes-AMG E 53 HYBRID 4MATIC+',
    trimName: 'Mercedes-AMG E 53 HYBRID 4MATIC+',
    page: 'e53.html',

    price: {
      label: '차량 가격', value: '143,000,000원', verify: false,   // e53.html PRICE & MODEL 섹션에 표시
      _check: '2026-11-10 사용자 지정 가격 143,000,000원 적용. 참고: hybrid.html 상세 제원·비교표(MY26)에는 1억 4,160만원 표기 — 해당 페이지 확인 필요',
    },

    specs: {
      engine:        { label: '엔진', value: '직렬 6기통 가솔린 터보 (M256M) + 전기모터' },
      displacement:  { label: '배기량', value: '2,998 cc' },
      enginePower:   { label: '엔진 최고출력', value: '449 ps', note: '5,800–6,100 rpm' },
      engineTorque:  { label: '엔진 최대토크', value: '57.1 kg·m', note: '2,200–5,000 rpm' },
      motorPower:    { label: '전기모터 출력', value: '120 kW / 163 ps' },
      motorTorque:   { label: '전기모터 최대토크', value: '49.0 kg·m' },
      systemPower:   { label: '시스템 출력', value: '585 ps' },   // 국내 출시 보도(2025.02): 최대 585마력
      systemTorque:  { label: '시스템 토크', value: '76.5 kg·m' },
      battery:       { label: '고전압 배터리 용량', value: '21.2 kWh' },
      evRange:       { label: '전기 주행거리', value: '66 km', note: '전기 모드 최고속도 140 km/h' },
      evEfficiency:  { label: '전기 복합전비', value: '2.4 km/kWh' },
      fuelEconomy:   { label: '복합연비 (내연)', value: '8.6 km/L', note: '5등급' },
      co2:           { label: 'CO₂ 배출량', value: '40 g/km' },   // 오토뷰 제원표(E 53 하이브리드 / 에디션 1 공통)
      acceleration:  { label: '0–100 km/h', value: '3.8 초' },
      topSpeed:      { label: '최고속도', value: '250 km/h' },
      drive:         { label: '구동방식', value: 'AMG Performance 4MATIC+' },
      transmission:  { label: '변속기', value: 'AMG SPEEDSHIFT TCT 9G' },
      suspension:    { label: '서스펜션', value: 'AMG RIDE CONTROL' },
      rearSteer:     { label: '리어 액슬 스티어링', value: '최대 2.5°' },
      size:          { label: '전장 × 전폭 × 전고', value: '4,970 × 1,900 × 1,475 mm' },
      wheelbase:     { label: '축거', value: '2,960 mm' },
      weight:        { label: '공차중량', value: '2,390 kg' },
      trunk:         { label: '트렁크 용량', value: '370 L' },
      fuelTank:      { label: '연료탱크', value: '60 L' },        // 오토뷰 제원표(E 53 하이브리드 / 에디션 1 공통)
    },

    specGroups: [
      { title: '파워트레인', keys: ['engine', 'displacement', 'enginePower', 'engineTorque', 'motorPower', 'motorTorque', 'systemPower', 'systemTorque', 'drive', 'transmission'] },
      { title: '배터리', keys: ['battery', 'evRange', 'evEfficiency'] },
      { title: '성능 · 효율', keys: ['acceleration', 'topSpeed', 'fuelEconomy', 'co2'] },
      { title: '차체 · 섀시', keys: ['size', 'wheelbase', 'weight', 'trunk', 'fuelTank', 'suspension', 'rearSteer'] },
    ],

    equipmentCategories: [
      { id: 'performance', label: 'AMG 퍼포먼스' },
      { id: 'exterior',    label: '외관 및 디자인' },
      { id: 'interior',    label: '실내 및 시트' },
      { id: 'comfort',     label: '편의사양' },
      { id: 'info',        label: '인포테인먼트' },
      { id: 'safety',      label: '주행 및 안전' },
      { id: 'hybrid',      label: '하이브리드' },
    ],

    standardEquipment: [
      { cat: 'performance', name: 'AMG SPEEDSHIFT TCT 9G', desc: 'AMG 전용 세팅의 9단 자동변속기입니다.', img: '' },
      { cat: 'performance', name: 'AMG RIDE CONTROL 서스펜션', desc: '주행 모드에 따라 감쇠력을 조절하는 AMG 서스펜션입니다.', img: '' },
      { cat: 'performance', name: 'AMG Performance 4MATIC+', desc: '주행 상황에 따라 앞·뒤 구동력을 가변 제어하는 AMG 사륜구동입니다.', img: '' },
      { cat: 'performance', name: 'AMG 리어 액슬 잠금 디퍼렌셜 (전자식)', desc: '코너링 시 좌우 뒷바퀴 사이의 동력을 분배하고, 차선 변경 시 주행 안정성을 높입니다. 기본 적용되는 AMG 다이내믹 플러스 패키지에 포함됩니다.', img: '' },
      { cat: 'performance', name: 'AMG 리어 액슬 스티어링 (최대 2.5°)', desc: '저속에서는 회전 반경을 줄이고, 고속에서는 차선 변경 안정성을 높입니다.', img: '' },
      { cat: 'performance', name: 'AMG 하이퍼포먼스 브레이크', desc: '고성능 주행을 위한 AMG 브레이크 시스템입니다.', img: '' },

      { cat: 'exterior', name: 'AMG 익스테리어 패키지', desc: 'AMG 전용 범퍼와 디자인 요소로 구성된 외관입니다.', img: '' },
      { cat: 'exterior', name: 'AMG 라디에이터 그릴', desc: 'AMG 고유의 수직 루버 디자인 그릴입니다.', img: '' },
      { cat: 'exterior', name: 'AMG 20인치 10트윈 스포크 경량 알로이 휠', desc: 'AMG 10트윈 스포크 디자인의 20인치 경량 알로이 휠입니다.', img: '' },
      { cat: 'exterior', name: '파워돔 보닛', desc: '보닛 위 두 줄의 파워돔이 역동적인 인상을 줍니다.', img: '' },
      { cat: 'exterior', name: 'AMG 리어 스포일러', desc: '트렁크 리드 끝단의 AMG 스포일러입니다.', img: '' },

      { cat: 'interior', name: 'AMG 나파 가죽 시트', desc: '나파 가죽으로 마감한 AMG 시트입니다.', img: '' },
      { cat: 'interior', name: 'AMG 퍼포먼스 스티어링 휠', desc: '나파 가죽, 터치 컨트롤 버튼, 시프트 패들을 갖춘 AMG 스티어링 휠입니다.', img: '' },
      { cat: 'interior', name: 'ARTICO 대시보드', desc: '나파룩 ARTICO 인조가죽으로 대시보드를 마감했습니다.', img: '' },
      { cat: 'interior', name: '앞좌석 열선 · 통풍 · 메모리', desc: '계절별 온도 관리와 운전 자세 저장 기능을 제공합니다.', img: '' },
      { cat: 'interior', name: '액티브 앰비언트 라이트', desc: '실내 조명이 주행 정보·기능과 연동되어 반응합니다.', img: '' },
      { cat: 'interior', name: '열 · 소음 차단 글라스', desc: '외부 열과 소음 유입을 줄이는 글라스입니다.', img: '' },

      { cat: 'comfort', name: '4존 에어컨 & 공기청정 패키지', desc: '좌석별 온도 설정과 실내 공기 관리 기능을 제공합니다.', img: '' },
      { cat: 'comfort', name: '파워 클로징', desc: '도어를 살짝 닫으면 자동으로 완전히 닫힙니다.', img: '' },
      { cat: 'comfort', name: '에너자이징 패키지', desc: '조명·음악·공조 등을 연계한 실내 컴포트 프로그램입니다.', img: '' },
      { cat: 'comfort', name: '서라운드 카메라 & 액티브 주차 어시스트', desc: '주변 영상과 자동 주차 보조 기능을 제공합니다.', img: '' },
      { cat: 'comfort', name: '리어 윈도우 전동 선쉐이드', desc: '뒷유리 햇빛가리개를 전동으로 조작합니다.', img: '' },
      { cat: 'comfort', name: '사전 공조 시스템', desc: '탑승 전 실내 온도를 미리 맞출 수 있습니다.', img: '' },

      { cat: 'info', name: 'MBUX 슈퍼스크린', desc: '중앙과 동승석까지 이어지는 대형 디스플레이 구성입니다.', img: '' },
      { cat: 'info', name: '12.3인치 계기반', desc: 'AMG 전용 화면을 지원하는 디지털 계기반입니다.', img: '' },
      { cat: 'info', name: '헤드업 디스플레이', desc: '주요 주행 정보를 운전자 시선 앞쪽에 띄웁니다.', img: '' },
      { cat: 'info', name: 'T맵 오토 증강현실 내비게이션', desc: '국내 지도 기반 내비게이션에 증강현실 안내를 더했습니다.', img: '' },
      { cat: 'info', name: '부메스터® 4D 사운드 & Dolby Atmos', desc: '입체 음향과 시트 진동 기능을 갖춘 사운드 시스템입니다.', img: '' },
      { cat: 'info', name: 'AMG TRACK PACE', desc: '서킷 주행 데이터를 기록·분석하는 AMG 전용 기능입니다.', img: '' },
      { cat: 'info', name: 'MBUX 인테리어 어시스턴트', desc: '손 동작 등을 인식해 일부 기능을 조작합니다.', img: '' },
      { cat: 'info', name: '무선 Apple CarPlay / Android Auto · 무선 충전', desc: '스마트폰 무선 연결과 무선 충전을 지원합니다.', img: '' },

      { cat: 'safety', name: 'PRE-SAFE® 시스템 (Sound · PLUS · Impulse Side)', desc: '충돌 위험 상황에서 탑승자 보호 조치를 미리 준비합니다.', img: '' },
      { cat: 'safety', name: 'Active Brake Assist (교차로 기능 포함)', desc: '전방·교차 차량과의 충돌 위험 시 제동을 보조합니다.', img: '' },
      { cat: 'safety', name: 'Active Distance Assist DISTRONIC', desc: '앞차와의 거리를 유지하며 속도를 자동 조절합니다.', img: '' },
      { cat: 'safety', name: 'Active Lane Keeping Assist', desc: '차선 이탈을 감지하고 복귀를 보조합니다.', img: '' },
      { cat: 'safety', name: '조향 회피 어시스트', desc: '운전자가 회피 조향할 때 조향을 보조합니다.', img: '' },
      { cat: 'safety', name: '야간 보행자 감지 어시스턴트', desc: '어두운 환경에서 보행자를 감지해 알려줍니다.', img: '' },
      { cat: 'safety', name: 'ADAPTIVE BRAKE (HOLD) · 어댑티브 브레이크 램프', desc: '정차 유지 기능과 급제동 시 점멸하는 브레이크 램프입니다.', img: '' },

      { cat: 'hybrid', name: '고전압 배터리 21.2 kWh', desc: '고성능 PHEV를 위한 고전압 배터리입니다.', img: '' },
      { cat: 'hybrid', name: '120 kW 전기모터', desc: '전기 주행과 엔진 가속 보조를 담당하는 전기모터입니다.', img: '' },
      { cat: 'hybrid', name: '원격 예약 충전', desc: '스마트폰으로 충전 시간을 예약할 수 있습니다.', img: '' },
    ],

    /* 유료 선택 사양 — 국내 견적서 기준 확인 후 입력하세요.
       예) { cat:'exterior', name:'옵션명', desc:'설명', img:'', price:'' } */
    optionalEquipment: [],
  },
};
