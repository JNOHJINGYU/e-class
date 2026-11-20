/* ==========================================================================
   Mercedes-Benz 공통 차량 제원 비교 모듈 — 차량 데이터 (vehicle-data.js)
   --------------------------------------------------------------------------
   ▶ 모든 비교 차량의 가격·제원·사양을 "이 파일 한 곳"에서만 관리합니다.
     가격이나 제원을 고치면 이 모듈을 쓰는 모든 페이지의 비교표에 자동 반영됩니다.
   ▶ 기존 e-class/vehicle-data.js(VEHICLE_DATA, 하이브리드 페이지용)와는 별개 파일입니다.

   [값 입력 규칙]
   - 숫자 제원은 단위 없이 숫자만 입력합니다. 단위는 vehicle-compare.js의 FIELDS에 정의되어 있습니다.
       power: 197            → 화면 표시 "197 ps"
   - 메모·출처·검증이 필요하면 객체로 입력합니다.
       height: { value: 1465, verify: true, note: '…' }
       verify: true  → 화면에 '확인 필요' 표시 + "차이점만 보기"에서 비교 제외
   - 확인되지 않은 값은 입력하지 않거나 null로 둡니다. (임의 수치 금지 → 화면에 '정보 없음')
   - 가격은 원 단위 숫자로 입력합니다. (87200000 → "8,720만원")
   - 편의·안전 사양 상태값:  'std' 기본 · 'opt' 선택 · 'na' 미적용 · 'check' 확인 필요
       hud: 'std'                                   → "기본"
       sound: { status: 'std', text: '부메스터 4D' }  → "부메스터 4D (기본)"
   - powertrain: 'gasoline' | 'diesel' | 'phev' | 'ev'
       구동 방식에 맞지 않는 항목(예: 디젤 차량의 배터리 용량)은 자동으로 '해당 없음' 처리됩니다.

   [단위 기준]
   - 출력 ps (1 kW = 1.35962 ps) · 토크 kg·m (1 kg·m = 9.80665 Nm)
   - 연비 km/L · 전비 km/kWh · 가속 0→100 km/h 초 · 크기 mm · 중량 kg · 용량 L
   ========================================================================== */
(function (window) {
  'use strict';

  var CHECKED = '2026-11-20';   // 데이터 확인 날짜 (각 차량 source.checked 기본값)

  var VEHICLES = {

    /* ======================== Mercedes-Benz ======================== */

    'e200-exclusive': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 200', trim: 'EXCLUSIVE', short: 'E200',
      aliases: ['e200-avantgarde'],
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e200.html', note: 'E200 페이지 제원·기본 사양 데이터 / 경쟁차 비교표', checked: CHECKED },
      price: { value: 77500000, note: 'E200 경쟁차 비교표 기준 (EXCLUSIVE)' },
      specs: {
        engine: 'M254 직렬 4기통 가솔린 터보', displacement: 1999,
        power: { value: 204, note: '6,100 rpm' }, torque: { value: 32.6, note: '2,000~4,000 rpm' },
        drive: 'RWD (후륜구동)', transmission: { value: '9G-TRONIC', note: '자동 9단' },
        accel: 7.5, topSpeed: 240,
        fuelCombined: 12.3, fuelCity: 10.6, fuelHighway: 15.3,
        length: 4955, width: 1880, height: 1475, wheelbase: 2960, weight: 1750,
        trunk: 540, fuelTank: 66, suspension: '컴포트 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: 'LED 고성능 헤드램프' }, adaptiveHighBeam: 'std',
        wheels: { status: 'std', text: '18인치 5스포크 경량 알로이 휠' }, panoramaRoof: 'std',
        seatMaterial: { status: 'std', text: 'ARTICO 시트' },
        interiorTrim: { status: 'std', text: '블랙 오픈 포어 애쉬우드' },
        ambient: { status: 'std', text: '앰비언트 라이트' },
        heatedSeats: 'std', ventSeats: 'std', hud: 'std',
        sound: { status: 'std', text: '어드벤시드 사운드', note: 'E200 경쟁차 비교표 표기 그대로' },
        arNavi: 'std', wirelessCarplay: 'std', wirelessCharging: 'std',
        keylessGo: 'std', powerTrunk: 'std', surroundCamera: 'std', parkingAssist: 'std',
        drivingAssistPlus: 'std', semiAuto: 'std', distronic: 'std', laneKeeping: 'std', blindSpot: 'std',
        activeBrake: 'std', preSafe: 'std', airbags: { status: 'std', text: '11개' }
      }
    },

    'e220d-4matic-exclusive': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 220 d 4MATIC', trim: 'EXCLUSIVE', short: 'E220d',
      powertrain: 'diesel', modelYear: null, market: '국내 판매',
      source: { page: 'e220d.html', note: '기존 상세 제원 · E300 비교표 · 경쟁차 비교표 · 기본 적용 옵션', checked: CHECKED },
      price: { value: 87200000 },
      specs: {
        engine: 'OM654M 직렬 4기통 디젤', displacement: 1993, power: 197, torque: 44.9,
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' }, accel: 7.8, topSpeed: 234,
        fuelCombined: 16.0, fuelCity: 14.3, fuelHighway: 18.9,
        length: 4955, width: 1880,
        height: { value: 1465, verify: true, note: 'E300·E450 페이지는 1,475mm 표기 — 국내 제원표 확인 필요' },
        wheelbase: 2960, weight: 1910, trunk: 540, fuelTank: 66,
        tireFront: '245/45R19', tireRear: '275/40R19'
      },
      equipment: {
        headlamp: { status: 'std', text: 'LED 하이 퍼포먼스' }, adaptiveHighBeam: 'std',
        wheels: { status: 'std', text: '19인치 경량 알로이 휠' }, panoramaRoof: 'std',
        acousticGlass: 'na',
        seatMaterial: { status: 'std', text: 'ARTICO' },
        interiorTrim: { status: 'std', text: '블랙 오픈포어 애쉬우드' },
        ambient: { status: 'std', text: '앰비언트 라이트' },
        rooflinerBlack: 'na', heatedSeats: 'std', ventSeats: 'std',
        hud: { status: 'check', note: '경쟁차 비교표는 "기본", E300 비교표는 "—"로 서로 다름 · 기본 적용 옵션 목록에는 없음' },
        sound: { status: 'check', note: 'E300 비교표 "—" 표기 (부메스터 미적용) · 기본 사운드 명칭 미확인' },
        arNavi: 'std', wirelessCarplay: 'std', wirelessCharging: 'std', interiorAssistant: 'std',
        keylessGo: 'std', powerTrunk: 'std', surroundCamera: 'std', parkingAssist: 'std',
        drivingAssistPlus: 'std', semiAuto: 'std', distronic: 'std', laneKeeping: 'std', blindSpot: 'std',
        activeBrake: 'std', preSafe: { status: 'std', text: 'PRE-SAFE · PLUS · Impulse Side' }, activeBonnet: 'std'
      },
      recommend: [
        '연간 주행거리 2만km 이상',
        '연비를 최우선으로 생각하는 고객',
        '디젤 특유의 풍부한 토크감을 선호하는 고객',
        '실용성과 프리미엄을 함께 원하는 고객',
        '유지비를 합리적으로 관리하고 싶은 고객'
      ]
    },

    'e300-4matic-exclusive': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 300 4MATIC', trim: 'EXCLUSIVE', short: 'E300',
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e300.html', note: 'E300 페이지 상세 제원·경쟁차 비교표 / E220d 페이지 E300 비교표', checked: CHECKED },
      price: { value: 94800000 },
      specs: {
        engine: 'M254 직렬 4기통 가솔린 터보', displacement: 1999,
        power: { value: 258, note: '5,800 rpm' }, torque: { value: 40.8, note: '2,000~3,200 rpm' },
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' }, accel: 6.1, topSpeed: 250,
        fuelCombined: { value: 11.1, note: '4등급' }, fuelCity: 9.6, fuelHighway: 13.6, co2: 153,
        length: 4955, width: 1880, height: 1475, wheelbase: 2960, weight: 1905,
        trunk: 540, fuelTank: 66, turning: 6.0, tireFront: '245/45R19', tireRear: '275/40R19'
      },
      equipment: {
        headlamp: { status: 'std', text: '디지털 라이트' }, adaptiveHighBeam: 'std', acousticGlass: 'std',
        seatMaterial: { status: 'std', text: '천연가죽' },
        interiorTrim: { status: 'std', text: '브라운 메이플 우드 + 알루미늄 라인' },
        ambient: { status: 'std', text: '액티브 앰비언트 라이트' },
        rooflinerBlack: 'std', ventSeats: 'std', hud: 'std',
        sound: { status: 'std', text: '부메스터 4D' }, keylessGo: 'std', surroundCamera: 'std',
        semiAuto: 'std', distronic: 'std', laneKeeping: { status: 'std', text: '차선 이탈 방지' }, blindSpot: 'std',
        activeBrake: 'std', preSafe: 'std'
      },
      recommend: [
        '더욱 높은 출력과 스포티한 가속감을 원하는 고객',
        'HUD 및 부메스터 사운드 등 추가 사양을 원하는 고객',
        '천연가죽 시트와 고급 트림을 선호하는 고객',
        '디지털 라이트와 액티브 앰비언트를 중요하게 생각하는 고객'
      ]
    },

    'e450-4matic-exclusive': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 450 4MATIC', trim: 'EXCLUSIVE', short: 'E450',
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e450.html', note: 'E450 페이지 상세 제원·경쟁차 비교표', checked: CHECKED },
      price: { value: 129600000 },
      specs: {
        engine: 'M256M 직렬 6기통 터보 · 48V ISG', displacement: 2999,
        power: { value: 381, note: '5,800~6,100 rpm' }, torque: { value: 51.0, note: '1,800~5,000 rpm' },
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' }, accel: 4.5, topSpeed: 250,
        fuelCombined: { value: 10.5, note: '4등급' }, fuelCity: 9.0, fuelHighway: 13.1,
        length: 4955, width: 1880, height: 1475, wheelbase: 2960, weight: 1955,
        trunk: 540, fuelTank: 66, tireFront: '245/40R20', tireRear: '275/35R20',
        suspension: '에어매틱 (AIRMATIC)'
      },
      equipment: {
        headlamp: { status: 'std', text: '디지털 라이트' }, hud: 'std', rearSteer: { status: 'std', text: '4.5°' },
        sound: { status: 'std', text: '부메스터 4D' }, surroundCamera: 'std', parkingAssist: 'std',
        semiAuto: 'std', distronic: 'std', laneKeeping: { status: 'std', text: '차선 이탈 방지 패키지' }, blindSpot: 'std',
        activeBrake: 'std', preSafe: { status: 'std', text: 'PRE-SAFE® 시스템 플러스' }
      }
    },

    'e350e-4matic-exclusive': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 350 e 4MATIC', trim: 'EXCLUSIVE', short: 'E350e',
      powertrain: 'phev', modelYear: 'MY26', market: '국내 판매',
      source: { page: 'e350e.html', note: 'e-class/vehicle-data.js (2026.07.01 갱신 옵션표 기준)', checked: CHECKED },
      price: { value: 101100000, note: '2026.07.01 갱신 옵션표 기준' },
      specs: {
        engine: '직렬 4기통 가솔린 터보 (M254) + 전기모터', displacement: 1999,
        power: { value: 204, note: '6,100 rpm' }, torque: { value: 32.6, note: '2,000~4,000 rpm' },
        motorPower: { value: 129, note: '95 kW' }, motorTorque: { value: 44.9, note: '440 Nm' },
        systemPower: { value: 313, note: '제조사 발표 합산값 (313 마력)' }, systemTorque: { value: 56.1, note: '550 Nm' },
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' },
        accel: { value: 6.6, verify: true, note: 'MY26 옵션표 6.6초 / 인증 보도 6.4초' },
        topSpeed: { value: 234, verify: true, note: '옵션표 외 국내 공식 자료 미확인' },
        fuelCombined: { value: 11.1, note: '도심 10.0 · 고속 12.7' }, fuelCity: 10.0, fuelHighway: 12.7, co2: 27,
        evRange: { value: 77, note: '1회 충전 · 국내 인증' }, evEfficiency: { value: 3.1, note: '도심 2.9 · 고속 3.4' },
        battery: { value: 25.4, verify: true, note: '총용량/가용용량 구분 미표기' },
        acCharging: { value: null, verify: true, note: '국내 사양 온보드 충전기 공식 자료 미확인' },
        length: 4955, width: 1880, height: 1480, wheelbase: 2960, weight: 2215,
        trunk: 370, fuelTank: 50, tireFront: '245/45R19', tireRear: '275/40R19', suspension: '컴포트 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: '디지털 라이트' }, adaptiveHighBeam: { status: 'std', text: '어댑티브 하이빔 어시스트 플러스' },
        wheels: { status: 'std', text: '19인치 5-스포크 휠' }, panoramaRoof: 'std', acousticGlass: { status: 'std', text: '열 · 소음 차단 글래스' },
        seatMaterial: { status: 'std', text: '천연 가죽' },
        interiorTrim: { status: 'std', text: '브라운 오픈 포어 메이플 우드 알루미늄 라인' },
        ambient: { status: 'std', text: '액티브 앰비언트 라이트' },
        heatedSeats: 'std', ventSeats: 'std', hud: 'std', sound: { status: 'std', text: 'Burmester® 4D 서라운드' },
        arNavi: 'std', wirelessCarplay: 'std', wirelessCharging: 'std',
        keylessGo: 'std', powerTrunk: 'std', surroundCamera: 'std', parkingAssist: 'std',
        drivingAssistPlus: 'std', distronic: 'std', laneKeeping: 'std', blindSpot: 'std',
        activeBrake: 'std', preSafe: { status: 'std', text: 'PRE-SAFE® · Sound · PLUS · Impulse Side' },
        activeBonnet: 'std', airbags: { status: 'std', text: '11개' }
      }
    },

    'amg-e53-hybrid': {
      brand: 'Mercedes-Benz', model: 'Mercedes-AMG E-Class', name: 'Mercedes-AMG E 53 HYBRID 4MATIC+', trim: '', short: 'AMG E 53',
      powertrain: 'phev', modelYear: null, market: '국내 판매',
      source: { page: 'e53.html', note: 'e-class/vehicle-data.js', checked: CHECKED },
      price: { value: 143000000, note: '2026-11-10 지정 가격 · hybrid.html은 1억 4,160만원 표기 (확인 필요)' },
      specs: {
        engine: '직렬 6기통 가솔린 터보 (M256M) + 전기모터', displacement: 2998,
        power: { value: 449, note: '5,800~6,100 rpm' }, torque: { value: 57.1, note: '2,200~5,000 rpm' },
        motorPower: { value: 163, note: '120 kW' }, motorTorque: 49.0,
        systemPower: 585, systemTorque: 76.5,
        drive: 'AMG Performance 4MATIC+', transmission: 'AMG SPEEDSHIFT TCT 9G', accel: 3.8, topSpeed: 250,
        fuelCombined: { value: 8.6, note: '5등급' }, co2: 40,
        evRange: { value: 66, note: '전기 모드 최고속도 140 km/h' }, evEfficiency: 2.4, battery: 21.2,
        length: 4970, width: 1900, height: 1475, wheelbase: 2960, weight: 2390, trunk: 370, fuelTank: 60,
        suspension: 'AMG RIDE CONTROL'
      },
      equipment: {
        wheels: { status: 'std', text: 'AMG 20인치 10트윈 스포크' }, rearSteer: { status: 'std', text: '최대 2.5°' }, acousticGlass: { status: 'std', text: '열 · 소음 차단 글라스' },
        seatMaterial: { status: 'std', text: 'AMG 나파 가죽' }, ambient: { status: 'std', text: '액티브 앰비언트 라이트' },
        heatedSeats: 'std', ventSeats: 'std', hud: 'std', sound: { status: 'std', text: '부메스터® 4D & Dolby Atmos' },
        arNavi: 'std', wirelessCarplay: 'std', wirelessCharging: 'std', interiorAssistant: 'std',
        surroundCamera: 'std', parkingAssist: 'std',
        distronic: 'std', laneKeeping: 'std', activeBrake: { status: 'std', text: '교차로 기능 포함' },
        preSafe: { status: 'std', text: 'PRE-SAFE® (Sound · PLUS · Impulse Side)' }
      }
    },

    /* ============================== BMW ============================== */
    /* 경쟁차 데이터는 각 E-Class 페이지의 기존 경쟁차 비교표에 있던 값만 옮겼습니다. 없는 값은 비워 둡니다. */

    'bmw-520i': {
      brand: 'BMW', model: '5 Series', name: 'BMW 520i', trim: '', short: '520i', powertrain: 'gasoline',
      source: { page: 'e200.html', note: 'E200 경쟁차 비교표', checked: CHECKED },
      price: { value: 69800000 },
      specs: { power: 190, torque: 31.0, drive: '후륜' },
      equipment: { headlamp: { status: 'std', text: '어댑티브 LED 라이트' }, hud: 'std', sound: { status: 'std', text: '스텐다드' }, semiAuto: 'std', ventSeats: 'std' }
    },
    'bmw-523d-xdrive': {
      brand: 'BMW', model: '5 Series', name: 'BMW 523d xDrive', trim: '', short: '523d', powertrain: 'diesel',
      source: { page: 'e220d.html', note: 'E220d 경쟁차 비교표', checked: CHECKED },
      price: { value: 84300000 },
      specs: { power: 197, torque: 40.0, drive: 'xDrive', fuelCombined: 14.7 },
      equipment: { hud: 'std', semiAuto: 'std', ventSeats: 'std' }
    },
    'bmw-530i-xdrive': {
      brand: 'BMW', model: '5 Series', name: 'BMW 530i xDrive', trim: '', short: '530i', powertrain: 'gasoline',
      source: { page: 'e300.html', note: 'E300 경쟁차 비교표', checked: CHECKED },
      price: { value: 89000000 },
      specs: { power: 258, torque: 40.0, drive: 'xDrive' },
      equipment: { headlamp: { status: 'std', text: '어댑티브 LED 라이트' }, hud: 'std', sound: { status: 'std', text: '하만카돈 Hi-Fi' }, semiAuto: 'std', ventSeats: 'std' }
    },
    'bmw-550e-xdrive': {
      brand: 'BMW', model: '5 Series', name: 'BMW 550e xDrive', trim: '', short: '550e', powertrain: 'phev',
      source: { page: 'e450.html', note: 'E450 경쟁차 비교표', checked: CHECKED },
      price: { value: 115300000 },
      specs: { systemPower: 489, motorPower: 197, systemTorque: 71.4, motorTorque: 28.6, drive: 'xDrive', accel: 4.3 },
      equipment: { headlamp: { status: 'std', text: '어댑티브 LED 라이트' }, hud: 'std', sound: { status: 'std', text: 'B&W 서라운드' }, semiAuto: 'std', rearSteer: 'std' }
    },

    /* ============================== Audi ============================== */

    'audi-a6': {
      brand: 'Audi', model: 'A6', name: 'Audi A6', trim: '세부 트림 미표기', short: 'A6', powertrain: 'gasoline',
      source: { page: 'e200.html', note: 'E200 경쟁차 비교표 (트림명 미표기 — 확인 필요)', checked: CHECKED },
      price: { value: 67640000 },
      specs: { power: 203, torque: 34.6, drive: '전륜' },
      equipment: { headlamp: { status: 'std', text: 'Matrix LED' }, hud: 'std', sound: { status: 'std', text: 'B&O 3D 사운드' }, semiAuto: 'std', ventSeats: 'std' }
    },
    'audi-a6-40-tdi-quattro': {
      brand: 'Audi', model: 'A6', name: 'Audi A6 40 TDI quattro', trim: '', short: 'A6 40 TDI', powertrain: 'diesel',
      source: { page: 'e220d.html', note: 'E220d 경쟁차 비교표', checked: CHECKED },
      price: { value: 81780000 },
      specs: { power: 204, torque: 40.8, drive: 'quattro', fuelCombined: 15.1 },
      equipment: { hud: 'std', semiAuto: 'std', ventSeats: 'std' }
    },
    'audi-a6-quattro': {
      brand: 'Audi', model: 'A6', name: 'Audi A6 quattro', trim: '세부 트림 미표기', short: 'A6 quattro', powertrain: 'gasoline',
      source: { page: 'e300.html', note: 'E300 경쟁차 비교표 (트림명 미표기 — 확인 필요)', checked: CHECKED },
      price: { value: 85410000 },
      specs: { power: 271, torque: 40.0, drive: 'quattro' },
      equipment: { headlamp: { status: 'std', text: 'Matrix LED' }, hud: 'std', sound: { status: 'std', text: 'B&O 3D 사운드' }, semiAuto: 'std', ventSeats: 'std' }
    },
    'audi-a6-55-tfsi-quattro': {
      brand: 'Audi', model: 'A6', name: 'Audi A6 55 TFSI quattro', trim: '', short: 'A6 55 TFSI', powertrain: 'gasoline',
      source: { page: 'e450.html', note: 'E450 경쟁차 비교표', checked: CHECKED },
      price: { value: 97180000 },
      specs: { power: 367, torque: 56.0, drive: 'quattro', accel: 4.8 },
      equipment: { headlamp: { status: 'std', text: 'Matrix LED' }, hud: 'std', sound: { status: 'std', text: 'B&O 3D 사운드' }, semiAuto: 'std', rearSteer: 'na' }
    }
  };

  /* 다른 데이터 파일과 합쳐 쓸 수 있도록 기존 등록분에 추가합니다. */
  var store = window.MBVC_VEHICLES = window.MBVC_VEHICLES || {};
  for (var id in VEHICLES) if (Object.prototype.hasOwnProperty.call(VEHICLES, id)) store[id] = VEHICLES[id];
  window.MBVC_DATA_META = { basis: '각 모델 랜딩페이지 기존 제원·비교표 · e-class/vehicle-data.js', checked: CHECKED };
})(window);
