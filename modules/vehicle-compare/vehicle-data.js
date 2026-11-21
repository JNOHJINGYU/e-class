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
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 200', trim: 'EXCLUSIVE', short: 'E200', aliases: ['e200-avantgarde'],
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e200.html', note: 'E200 페이지 제원·기본 사양 데이터(TRIM_EQUIPMENT 포함) · 2026-04 보도자료는 7,660만원(개소세 인하 반영) 표기 → 가격 확인 필요', checked: '2026-11-21' },
      price: { value: 77500000, note: 'E200 페이지 기재 가격 (EXCLUSIVE)' },
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
        exteriorPackage: { status: 'std', text: 'EXCLUSIVE 외장 패키지' },
        headlamp: { status: 'std', text: 'LED 고성능 헤드램프' }, adaptiveHighBeam: 'std',
        wheels: { status: 'std', text: '18인치 5스포크 경량 알로이 휠', note: '보도자료 표기: 18인치 5트윈 스포크' }, panoramaRoof: 'std',
        seatType: { status: 'std', text: '컴포트 시트' },
        seatMaterial: { status: 'std', text: 'ARTICO 시트' },
        steering: { status: 'std', text: '나파가죽 스티어링 휠' },
        interiorTrim: { status: 'std', text: '블랙 오픈 포어 애쉬우드' },
        ambient: { status: 'std', text: '앰비언트 라이트' },
        heatedSeats: 'std', ventSeats: 'std', hud: 'std',
        sound: { status: 'check', note: '기존 비교표 "어드벤시드 사운드" 표기 · 정식 명칭 확인 필요' },
        engineSound: 'na',
        arNavi: 'std', wirelessCarplay: { status: 'std', text: '무선 애플 카플레이 · 안드로이드 오토' }, wirelessCharging: 'std',
        keylessGo: 'std', powerTrunk: 'std', surroundCamera: 'std', parkingAssist: { status: 'std', text: '액티브 주차 어시스트' },
        drivingAssistPlus: 'std', semiAuto: 'std', distronic: 'std', laneKeeping: 'std', blindSpot: 'std',
        activeBrake: 'std', preSafe: 'std', airbags: { status: 'std', text: '11개' }
      },
      recommend: [
        'E-Class를 합리적인 가격으로 경험하고 싶은 고객',
        '부드러운 승차감과 클래식한 디자인을 선호하는 고객'
      ]
    },
    'e200-amg-line': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 200', trim: 'AMG Line', short: 'E200 AMG', aliases: ['e200-amg'],
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e200.html', note: 'E200 페이지 TRIM_DATA·TRIM_EQUIPMENT (파워트레인 EXCLUSIVE와 동일) · 공차중량·연비 AMG Line 별도 인증값 미표기', checked: '2026-11-21' },
      price: { value: 81000000, note: 'E200 페이지 기재 가격 (AMG Line)' },
      specs: {
        engine: 'M254 직렬 4기통 가솔린 터보', displacement: 1999,
        power: { value: 204, note: '6,100 rpm' }, torque: { value: 32.6, note: '2,000~4,000 rpm' },
        drive: 'RWD (후륜구동)', transmission: { value: '9G-TRONIC', note: '자동 9단' },
        accel: 7.5, topSpeed: 240,
        fuelCombined: { value: 12.3, verify: true, note: 'EXCLUSIVE 수치 · AMG Line(19인치 휠) 인증값 미표기' },
        fuelCity: { value: 10.6, verify: true, note: 'EXCLUSIVE 수치' }, fuelHighway: { value: 15.3, verify: true, note: 'EXCLUSIVE 수치' },
        length: { value: 4955, verify: true, note: 'EXCLUSIVE 수치 · AMG 범퍼 적용 시 전장 확인 필요' }, width: 1880, height: 1475, wheelbase: 2960,
        weight: { value: 1750, verify: true, note: 'EXCLUSIVE 수치' },
        trunk: 540, fuelTank: 66, suspension: '스포츠 서스펜션'
      },
      equipment: {
        exteriorPackage: { status: 'std', text: 'AMG Line 외장 패키지' },
        headlamp: { status: 'std', text: 'LED 고성능 헤드램프' }, adaptiveHighBeam: 'std',
        wheels: { status: 'std', text: '19인치 AMG 휠' }, panoramaRoof: 'std',
        seatType: { status: 'std', text: '스포츠 시트' },
        seatMaterial: { status: 'std', text: 'ARTICO 시트' },
        steering: { status: 'std', text: '다기능 스포츠 나파 스티어링 휠' },
        interiorTrim: { status: 'std', text: '블랙 피아노 라커' },
        ambient: { status: 'std', text: '앰비언트 라이트' },
        heatedSeats: 'std', ventSeats: 'std', hud: 'std',
        sound: { status: 'check', note: '기존 비교표 "어드벤시드 사운드" 표기 · 정식 명칭 확인 필요' },
        engineSound: { status: 'std', text: '스포티 엔진 사운드' },
        arNavi: 'std', wirelessCarplay: { status: 'std', text: '무선 애플 카플레이 · 안드로이드 오토' }, wirelessCharging: 'std',
        keylessGo: 'std', powerTrunk: 'std', surroundCamera: 'std', parkingAssist: { status: 'std', text: '액티브 주차 어시스트' },
        drivingAssistPlus: 'std', semiAuto: 'std', distronic: 'std', laneKeeping: 'std', blindSpot: 'std',
        activeBrake: 'std', preSafe: 'std', airbags: { status: 'std', text: '11개' }
      },
      recommend: [
        '스포티한 외관과 19인치 AMG 휠을 원하는 고객',
        '스포츠 시트·스포츠 스티어링 휠의 단단한 감각을 선호하는 고객'
      ]
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
        exteriorPackage: { status: 'std', text: 'EXCLUSIVE' },
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
      source: { page: 'e300.html', note: 'E300 페이지 상세 제원·트림 비교표·편의/안전 사양 / E220d 페이지 E300 비교표', checked: CHECKED },
      price: { value: 94800000 },
      specs: {
        engine: 'M254 직렬 4기통 가솔린 터보', displacement: 1999,
        power: { value: 258, note: '5,800 rpm' }, torque: { value: 40.8, note: '2,000~3,200 rpm' },
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' }, accel: 6.1, topSpeed: 250,
        fuelCombined: { value: 11.1, note: '4등급' }, fuelCity: 9.6, fuelHighway: 13.6, co2: 153,
        length: 4955, width: 1880, height: 1475, wheelbase: 2960, weight: 1905,
        trunk: 540, fuelTank: 66, turning: 6.0, tireFront: '245/45R19', tireRear: '275/40R19',
        suspension: '컴포트 서스펜션'
      },
      equipment: {
        exteriorPackage: { status: 'std', text: 'EXCLUSIVE' },
        seatType: { status: 'std', text: '컴포트 시트' },
        steering: { status: 'std', text: '다기능 나파 가죽' },
        passengerScreen: 'na', engineSound: 'na',
        panoramaRoof: 'std', heatedSeats: 'std', arNavi: 'std',
        wirelessCarplay: { status: 'std', text: '무선 애플 카플레이 · 안드로이드 오토' }, wirelessCharging: 'std',
        powerTrunk: 'std', parkingAssist: { status: 'std', text: '액티브 주차 어시스트' },
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
    'e300-4matic-amg-line': {
      brand: 'Mercedes-Benz', model: 'E-Class', name: 'E 300 4MATIC', trim: 'AMG Line', short: 'E300 AMG', aliases: ['e300-amg-line', 'e300-4matic-amg'],
      powertrain: 'gasoline', modelYear: null, market: '국내 판매',
      source: { page: 'e300.html', note: 'E300 페이지 EXCLUSIVE vs AMG Line 비교표 (파워트레인 동일) · 휠/타이어·시트 소재 미표기', checked: CHECKED },
      price: { value: 99000000 },
      specs: {
        engine: 'M254 직렬 4기통 가솔린 터보', displacement: 1999,
        power: { value: 258, note: '5,800 rpm' }, torque: { value: 40.8, note: '2,000~3,200 rpm' },
        drive: '4MATIC', transmission: { value: '9G-TRONIC', note: '자동 9단' }, accel: 6.1, topSpeed: 250,
        fuelCombined: { value: 11.1, note: '4등급 · EXCLUSIVE와 동일 파워트레인 기준', verify: true }, co2: { value: 153, verify: true, note: 'EXCLUSIVE 수치 · AMG Line 인증값 미표기' },
        length: 4955, width: 1880, height: 1475, wheelbase: 2960,
        trunk: 540, fuelTank: 66,
        suspension: '어질리티 컨트롤 서스펜션'
      },
      equipment: {
        exteriorPackage: { status: 'std', text: 'AMG Line' },
        seatType: { status: 'std', text: '스포츠 시트' },
        steering: { status: 'std', text: '다기능 스포츠 나파 가죽' },
        passengerScreen: { status: 'std', text: '슈퍼스크린' },
        engineSound: { status: 'std', text: '스포티 엔진 사운드' },
        panoramaRoof: 'std', heatedSeats: 'std', arNavi: 'std',
        wirelessCarplay: { status: 'std', text: '무선 애플 카플레이 · 안드로이드 오토' }, wirelessCharging: 'std',
        powerTrunk: 'std', parkingAssist: { status: 'std', text: '액티브 주차 어시스트' },
        headlamp: { status: 'std', text: '디지털 라이트' }, adaptiveHighBeam: { status: 'check', note: 'AMG Line 적용 여부 자료 미표기' }, acousticGlass: 'std',
        seatMaterial: { status: 'check', note: '시트 소재 자료 미표기' },
        interiorTrim: { status: 'std', text: '블랙 피아노 라커 + 블랙 오픈 포어' },
        ambient: { status: 'check', note: 'AMG Line 적용 사양 자료 미표기' },
        rooflinerBlack: { status: 'check', note: 'AMG Line 적용 여부 자료 미표기' }, ventSeats: 'std', hud: 'std',
        sound: { status: 'std', text: '부메스터 4D' }, keylessGo: 'std', surroundCamera: 'std',
        semiAuto: 'std', distronic: 'std', laneKeeping: { status: 'std', text: '차선 이탈 방지' }, blindSpot: 'std',
        activeBrake: 'std', preSafe: 'std'
      },
      recommend: [
        '스포티한 디자인과 첨단 디스플레이를 선호하는 고객',
        '스포츠 시트와 스포츠 스티어링 휠의 감각을 원하는 고객',
        '조수석 디스플레이(슈퍼스크린)를 활용하고 싶은 고객'
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

    /* 출처: 바탕화면 '타브랜드' 폴더
       - BMW: THE 5 Approach Book 260907.pdf (BMW 코오롱모터스, 2026-09-07) — 판매가격·주요 사양·제원표
       - Audi: A6 어프로치.pdf (A6 26MY) — 판매가격·제원·기본 옵션
       자료에 없는 항목은 넣지 않았습니다(화면에는 '정보 없음'). */
    'bmw-520i': {
      brand: 'BMW', model: '5 Series (G60)', name: 'BMW 520i', trim: 'Base', short: '520i', powertrain: 'gasoline',
      source: { page: 'THE 5 Approach Book 260907.pdf', note: 'BMW THE 5 어프로치북 (2026-09-07) · 판매가격 P2 기준', checked: CHECKED },
      price: { value: 72000000 },
      specs: {
        engine: 'BMW 트윈파워 터보 4기통 가솔린 (48V MHEV)', displacement: 1998,
        power: { value: 190, note: '4,400~6,500 rpm' }, torque: { value: 31.6, note: '1,500~4,000 rpm' },
        drive: { value: '후륜', note: 'E200 페이지 비교표 기준' }, transmission: { value: '스텝트로닉', note: '자동 8단' },
        accel: 8.1, topSpeed: 230,
        fuelCombined: { value: 12.1, note: '3등급' }, fuelCity: 11.1, fuelHighway: 13.7, co2: 137,
        length: 5060, width: 1900, height: 1515, wheelbase: 2995, weight: 1835, trunk: 520, fuelTank: 60,
        tireFront: '245/45 R19', tireRear: '245/45 R19'
      },
      equipment: {
        headlamp: { status: 'std', text: '어댑티브 LED 헤드라이트' },
        wheels: { status: 'std', text: '19인치 934 바이컬러 그레이' },
        panoramaRoof: { status: 'std', text: '파노라마 글라스 루프' },
        seatMaterial: { status: 'std', text: '베간자 가죽 스포츠 시트' },
        interiorTrim: { status: 'std', text: 'M 알루미늄 롬비클' },
        ambient: { status: 'std', text: '인터렉션 바' },
        rooflinerBlack: { status: 'na', note: '안트라사이트 헤드라이너는 M Sport부터' },
        heatedSeats: { status: 'std', text: '앞·뒤' }, ventSeats: { status: 'std', text: '앞좌석' },
        hud: 'std', sound: { status: 'std', text: 'Hi-Fi 라우드 스피커 (6개, 100W)' },
        wirelessCharging: 'std', keylessGo: { status: 'std', text: '컴포트 액세스' },
        powerTrunk: { status: 'std', text: '전동식 (킥 오프닝)' },
        surroundCamera: { status: 'std', text: '서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파킹 어시스턴트 플러스' },
        semiAuto: { status: 'std', text: '드라이빙 어시스턴트 프로페셔널' },
        airbags: { status: 'std', text: '8개' }
      }
    },
    'bmw-523d-xdrive': {
      brand: 'BMW', model: '5 Series (G60)', name: 'BMW 523d xDrive', trim: 'Base', short: '523d', powertrain: 'diesel',
      source: { page: 'THE 5 Approach Book 260907.pdf', note: 'BMW THE 5 어프로치북 (2026-09-07) · 판매가격 xDrive P2 기준', checked: CHECKED },
      price: { value: 82200000 },
      specs: {
        engine: 'BMW 트윈파워 터보 4기통 디젤 (48V MHEV)', displacement: 1995,
        power: { value: 197, note: '4,000 rpm' }, torque: { value: 40.8, note: '1,500~2,750 rpm' },
        drive: 'xDrive', transmission: { value: '스텝트로닉', note: '자동 8단' },
        accel: 7.3, topSpeed: 228,
        fuelCombined: 13.8, fuelCity: 12.7, fuelHighway: 15.4, co2: 138,
        length: 5060, width: 1900, height: 1515, wheelbase: 2995, weight: 1965, trunk: 520, fuelTank: 60,
        tireFront: '245/45 R19', tireRear: '245/45 R19'
      },
      equipment: {
        headlamp: { status: 'std', text: '어댑티브 LED 헤드라이트' },
        wheels: { status: 'std', text: '19인치 934 바이컬러 그레이' },
        panoramaRoof: { status: 'std', text: '파노라마 글라스 루프' },
        seatMaterial: { status: 'std', text: '베간자 가죽 스포츠 시트' },
        interiorTrim: { status: 'std', text: 'M 알루미늄 롬비클' },
        ambient: { status: 'std', text: '인터렉션 바' },
        rooflinerBlack: { status: 'na', note: '안트라사이트 헤드라이너는 M Sport부터' },
        heatedSeats: { status: 'std', text: '앞·뒤' }, ventSeats: { status: 'std', text: '앞좌석' },
        hud: 'std', sound: { status: 'std', text: '하만 카돈 (12개, 205W)' },
        wirelessCharging: 'std', keylessGo: { status: 'std', text: '컴포트 액세스' },
        powerTrunk: { status: 'std', text: '전동식 (킥 오프닝)' },
        surroundCamera: { status: 'std', text: '서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파킹 어시스턴트 플러스' },
        semiAuto: { status: 'std', text: '드라이빙 어시스턴트 프로페셔널' },
        airbags: { status: 'std', text: '8개' }
      }
    },
    'bmw-530i-xdrive': {
      brand: 'BMW', model: '5 Series (G60)', name: 'BMW 530i xDrive', trim: 'Base', short: '530i', powertrain: 'gasoline',
      source: { page: 'THE 5 Approach Book 260907.pdf', note: 'BMW THE 5 어프로치북 (2026-09-07) · 판매가격 P2 기준', checked: CHECKED },
      price: { value: 86500000 },
      specs: {
        engine: 'BMW 트윈파워 터보 4기통 가솔린 (48V MHEV)', displacement: 1998,
        power: { value: 258, note: '4,600~6,500 rpm' }, torque: { value: 40.8, note: '1,600~4,500 rpm' },
        drive: 'xDrive', transmission: { value: '스텝트로닉', note: '자동 8단' },
        accel: 6.1, topSpeed: 250,
        fuelCombined: { value: 11.1, note: '4등급' }, fuelCity: 9.9, fuelHighway: 13.0, co2: 151,
        length: 5060, width: 1900, height: 1515, wheelbase: 2995, weight: 1905, trunk: 520, fuelTank: 60,
        tireFront: '245/45 R19', tireRear: '245/45 R19'
      },
      equipment: {
        headlamp: { status: 'std', text: '어댑티브 LED 헤드라이트' },
        wheels: { status: 'std', text: '19인치 934 바이컬러 그레이' },
        panoramaRoof: { status: 'std', text: '파노라마 글라스 루프' },
        seatMaterial: { status: 'std', text: '메리노 가죽 컴포트 시트' },
        interiorTrim: { status: 'std', text: '파인우드 그레이 블루 애쉬' },
        ambient: { status: 'std', text: '인터렉션 바 · 크리스탈 인테리어' },
        rooflinerBlack: { status: 'na', note: '안트라사이트 헤드라이너는 M Sport부터' },
        heatedSeats: { status: 'std', text: '앞·뒤' }, ventSeats: { status: 'std', text: '앞좌석' },
        hud: 'std', sound: { status: 'std', text: '하만 카돈 (12개, 205W)' },
        wirelessCharging: 'std', keylessGo: { status: 'std', text: '컴포트 액세스' },
        powerTrunk: { status: 'std', text: '전동식 (킥 오프닝)' },
        surroundCamera: { status: 'std', text: '서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파킹 어시스턴트 플러스' },
        semiAuto: { status: 'std', text: '드라이빙 어시스턴트 프로페셔널' },
        airbags: { status: 'std', text: '8개' }
      }
    },
    'bmw-530e': {
      brand: 'BMW', model: '5 Series (G60)', name: 'BMW 530e', trim: 'Base', short: '530e', powertrain: 'phev',
      source: { page: 'THE 5 Approach Book 260907.pdf', note: 'BMW THE 5 어프로치북 (2026-09-07) · 판매가격 P2 기준 (후륜 모델 수치)', checked: CHECKED },
      price: { value: 91500000 },
      specs: {
        engine: 'BMW 트윈파워 터보 4기통 가솔린', displacement: 1998,
        power: { value: 190, note: '5,000 rpm' }, torque: { value: 31.6, note: '1,500~4,000 rpm' },
        systemPower: 299, systemTorque: 45.9,
        transmission: { value: '스텝트로닉', note: '자동 8단' },
        accel: 6.3, topSpeed: { value: 230, note: '전기 모드 140 km/h' },
        fuelCombined: 11.3, fuelCity: 10.9, fuelHighway: 11.8, co2: 25,
        evRange: 70, evEfficiency: { value: 3.2, note: '도심 3.1 · 고속 3.3' },
        battery: { value: 22.1, note: '총 용량 (가용 18.7) · CATL' },
        length: 5060, width: 1900, height: 1515, wheelbase: 2995, weight: 2125, trunk: 520, fuelTank: 60,
        tireFront: '245/45 R19', tireRear: '245/45 R19', suspension: '후륜 에어 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: '어댑티브 LED 헤드라이트' },
        wheels: { status: 'std', text: '19인치 934 바이컬러 그레이' },
        panoramaRoof: { status: 'std', text: '파노라마 글라스 루프' },
        seatMaterial: { status: 'std', text: '메리노 가죽 컴포트 시트' },
        interiorTrim: { status: 'std', text: '파인우드 그레이 블루 애쉬' },
        ambient: { status: 'std', text: '인터렉션 바 · 크리스탈 인테리어' },
        rooflinerBlack: { status: 'na', note: '안트라사이트 헤드라이너는 M Sport부터' },
        heatedSeats: { status: 'std', text: '앞·뒤' }, ventSeats: { status: 'std', text: '앞좌석' },
        hud: 'std', sound: { status: 'std', text: '하만 카돈 (12개, 205W)' },
        wirelessCharging: 'std', keylessGo: { status: 'std', text: '컴포트 액세스' },
        powerTrunk: { status: 'std', text: '전동식 (킥 오프닝)' },
        surroundCamera: { status: 'std', text: '서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파킹 어시스턴트 플러스' },
        semiAuto: { status: 'std', text: '드라이빙 어시스턴트 프로페셔널' },
        airbags: { status: 'std', text: '8개' }
      }
    },
    'bmw-550e-xdrive': {
      brand: 'BMW', model: '5 Series (G60)', name: 'BMW 550e xDrive', trim: 'M Sport Pro', short: '550e', powertrain: 'phev',
      source: { page: 'THE 5 Approach Book 260907.pdf', note: 'BMW THE 5 어프로치북 (2026-09-07) · 판매가격 P1 기준 · 전기모터 수치는 E450 페이지 비교표', checked: CHECKED },
      price: { value: 116700000 },
      specs: {
        engine: 'BMW 트윈파워 터보 6기통 가솔린', displacement: 2998,
        power: { value: 313, note: '5,000~6,500 rpm' }, torque: { value: 45.9, note: '1,750~4,700 rpm' },
        systemPower: 489, systemTorque: 71.4, motorPower: 197, motorTorque: 28.6,
        drive: 'xDrive', transmission: { value: '스텝트로닉', note: '자동 8단' },
        accel: 4.3, topSpeed: { value: 250, note: '전기 모드 140 km/h' },
        fuelCombined: 10.1, fuelCity: 9.5, fuelHighway: 10.9, co2: 36,
        evRange: 62, evEfficiency: { value: 2.9, note: '도심 2.8 · 고속 3.1' },
        battery: { value: 22.1, note: '총 용량 (가용 19) · CATL' },
        length: 5060, width: 1900, height: 1515, wheelbase: 2995, weight: 2300, trunk: 520, fuelTank: 60,
        tireFront: '255/35 R21', tireRear: '285/30 R21',
        suspension: '어댑티브 M 서스펜션 프로페셔널 · 후륜 에어 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: '어댑티브 LED 헤드라이트 (쉐도우 라인)' },
        wheels: { status: 'std', text: '21인치 954 바이컬러 제트 블랙 M' },
        panoramaRoof: { status: 'std', text: '파노라마 글라스 루프' },
        seatMaterial: { status: 'std', text: '메리노 가죽 컴포트 시트' },
        interiorTrim: { status: 'std', text: '다크 실버 M 카본' },
        ambient: { status: 'std', text: '인터렉션 바 · 크리스탈 인테리어' },
        rooflinerBlack: { status: 'std', text: '안트라사이트 헤드라이너' },
        heatedSeats: { status: 'std', text: '앞·뒤' }, ventSeats: { status: 'std', text: '앞좌석' },
        hud: 'std', sound: { status: 'std', text: 'B&W 서라운드 (18개, 655W)' },
        wirelessCharging: 'std', keylessGo: { status: 'std', text: '컴포트 액세스' },
        powerTrunk: { status: 'std', text: '전동식 (킥 오프닝)' },
        surroundCamera: { status: 'std', text: '서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파킹 어시스턴트 프로페셔널 · 리모트 컨트롤 파킹' },
        rearSteer: { status: 'std', text: '인테그럴 액티브 스티어링' },
        semiAuto: { status: 'std', text: '드라이빙 어시스턴트 프로페셔널' },
        airbags: { status: 'std', text: '8개' }
      }
    },

    /* ============================== Audi ============================== */

    'audi-a6-40-tfsi': {
      brand: 'Audi', model: 'A6 (26MY)', name: 'Audi A6 40 TFSI', trim: 'Advanced', short: 'A6 40 TFSI', aliases: ['audi-a6'], powertrain: 'gasoline',
      source: { page: 'A6 어프로치.pdf', note: 'Audi A6 26MY 어프로치 자료', checked: CHECKED },
      price: { value: 67640000 },
      specs: {
        engine: '직렬 4기통 가솔린 터보 직분사 (TFSI)', displacement: 1984,
        power: { value: 203.9, note: '203.9 ps · 4,500~6,500 rpm' }, torque: { value: 34.67, note: '1,600~4,000 rpm' },
        drive: { value: '전륜', note: 'E200 페이지 비교표 기준' }, transmission: { value: 'S tronic', note: '자동 7단' },
        accel: 8.2, topSpeed: 244, fuelCombined: 10.7,
        length: 5005, width: 1875, height: 1460, wheelbase: 2923, weight: 1860, trunk: 492, fuelTank: 61,
        tireFront: '245/45 R19', tireRear: '245/45 R19', suspension: '컴포트 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: 'Matrix LED' }, adaptiveHighBeam: { status: 'std', text: '하이빔 어시스트' },
        wheels: { status: 'std', text: '19인치 5트윈 스포크 그라파이트 그레이' },
        panoramaRoof: { status: 'std', text: '스위처블 파노라믹 루프' },
        interiorTrim: { status: 'std', text: '알루미늄 탄젠트 인레이' },
        ambient: { status: 'std', text: '멀티컬러 · 다이내믹 인터렉션 라이트' },
        rooflinerBlack: { status: 'na', note: '블랙 헤드라이닝은 S-line' },
        heatedSeats: { status: 'std', text: '1·2열' }, ventSeats: { status: 'std', text: '1열' },
        hud: 'std', sound: { status: 'std', text: 'B&O 3D 프리미엄 (16스피커, 685W)' },
        wirelessCharging: 'std', powerTrunk: { status: 'std', text: '전동식 테일게이트' },
        surroundCamera: { status: 'std', text: '360° 서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파크 어시스트 프로 (원격 주차 포함)' },
        semiAuto: { status: 'std', text: 'ACA+ (중앙 유지·차선 변경 보조)' },
        blindSpot: { status: 'std', text: '사이드 어시스트' }
      }
    },
    'audi-a6-40-tdi-quattro': {
      brand: 'Audi', model: 'A6 (26MY)', name: 'Audi A6 40 TDI quattro', trim: 'S-line', short: 'A6 40 TDI', powertrain: 'diesel',
      source: { page: 'A6 어프로치.pdf', note: 'Audi A6 26MY 어프로치 자료', checked: CHECKED },
      price: { value: 81780000 },
      specs: {
        engine: '직렬 4기통 디젤 터보 직분사 (TDI) · 48V MHEV+', displacement: 1968,
        power: { value: 204, note: '3,800~4,200 rpm' }, torque: { value: 40.79, note: '1,750~3,250 rpm' },
        drive: 'quattro', transmission: { value: 'S tronic', note: '자동 7단' },
        accel: 6.9, topSpeed: 243, fuelCombined: 15.1,
        length: 5005, width: 1875, height: 1445, wheelbase: 2924, weight: 2055, trunk: 452, fuelTank: 64,
        tireFront: '255/40 R20', tireRear: '255/40 R20', suspension: 'S 스포츠 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: 'Matrix LED' }, adaptiveHighBeam: { status: 'std', text: '하이빔 어시스트' },
        wheels: { status: 'std', text: '20인치 10스포크 트위스트 그라파이트 그레이' },
        panoramaRoof: { status: 'std', text: '스위처블 파노라믹 루프' },
        interiorTrim: { status: 'std', text: '매트 브러시 알루미늄 인레이' },
        ambient: { status: 'std', text: '멀티컬러 · 다이내믹 인터렉션 라이트' },
        rooflinerBlack: { status: 'std', text: '블랙 헤드라이닝' },
        heatedSeats: { status: 'std', text: '1·2열' }, ventSeats: { status: 'std', text: '1열' },
        hud: 'std', sound: { status: 'std', text: 'B&O 3D 프리미엄 (16스피커, 685W)' },
        wirelessCharging: 'std', powerTrunk: { status: 'std', text: '전동식 테일게이트' },
        surroundCamera: { status: 'std', text: '360° 서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파크 어시스트 프로 (원격 주차 포함)' },
        semiAuto: { status: 'std', text: 'ACA+ (중앙 유지·차선 변경 보조)' },
        blindSpot: { status: 'std', text: '사이드 어시스트' }
      }
    },
    'audi-a6-45-tfsi-quattro': {
      brand: 'Audi', model: 'A6 (26MY)', name: 'Audi A6 45 TFSI quattro', trim: 'S-line', short: 'A6 45 TFSI', aliases: ['audi-a6-quattro'], powertrain: 'gasoline',
      source: { page: 'A6 어프로치.pdf', note: 'Audi A6 26MY 어프로치 자료', checked: CHECKED },
      price: { value: 85410000 },
      specs: {
        engine: '직렬 4기통 가솔린 터보 직분사 (TFSI)', displacement: 1984,
        power: { value: 271.9, note: '271.9 ps · 5,000~6,500 rpm' }, torque: { value: 40.79, note: '1,750~4,500 rpm' },
        drive: 'quattro', transmission: { value: 'S tronic', note: '자동 7단' },
        accel: 6.2, topSpeed: 250, fuelCombined: 10.4,
        length: 5005, width: 1875, height: 1445, wheelbase: 2924, weight: 1935, trunk: 492, fuelTank: 61,
        tireFront: '255/40 R20', tireRear: '255/40 R20', suspension: 'S 스포츠 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: 'Matrix LED' }, adaptiveHighBeam: { status: 'std', text: '하이빔 어시스트' },
        wheels: { status: 'std', text: '20인치 멀티 스포크 그라파이트 그레이' },
        panoramaRoof: { status: 'std', text: '스위처블 파노라믹 루프' },
        interiorTrim: { status: 'std', text: '매트 브러시 알루미늄 인레이' },
        ambient: { status: 'std', text: '멀티컬러 · 다이내믹 인터렉션 라이트' },
        rooflinerBlack: { status: 'std', text: '블랙 헤드라이닝' },
        heatedSeats: { status: 'std', text: '1·2열' }, ventSeats: { status: 'std', text: '1열' },
        hud: 'std', sound: { status: 'std', text: 'B&O 3D 프리미엄 (16스피커, 685W)' },
        wirelessCharging: 'std', powerTrunk: { status: 'std', text: '전동식 테일게이트' },
        surroundCamera: { status: 'std', text: '360° 서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파크 어시스트 프로 (원격 주차 포함)' },
        rearSteer: { status: 'std', text: '올 휠 스티어링' },
        semiAuto: { status: 'std', text: 'ACA+ (중앙 유지·차선 변경 보조)' },
        blindSpot: { status: 'std', text: '사이드 어시스트' }
      }
    },
    'audi-a6-55-tfsi-quattro': {
      brand: 'Audi', model: 'A6 (26MY)', name: 'Audi A6 55 TFSI quattro', trim: 'S-line', short: 'A6 55 TFSI', powertrain: 'gasoline',
      source: { page: 'A6 어프로치.pdf', note: 'Audi A6 26MY 어프로치 자료', checked: CHECKED },
      price: { value: 97180000 },
      specs: {
        engine: 'V6 가솔린 터보 직분사 (TFSI)', displacement: 2995,
        power: { value: 367, note: '5,500~6,300 rpm' }, torque: { value: 56.08, note: '1,700~4,000 rpm' },
        drive: 'quattro', transmission: { value: 'S tronic', note: '자동 7단' },
        accel: 4.8, topSpeed: 250, fuelCombined: 9.2,
        length: 5005, width: 1875, height: 1445, wheelbase: 2927, weight: 2005, trunk: 492, fuelTank: 61,
        tireFront: '255/35 R21', tireRear: '255/35 R21', suspension: '어댑티브 에어 서스펜션'
      },
      equipment: {
        headlamp: { status: 'std', text: 'Digital Matrix LED · OLED 테일라이트' }, adaptiveHighBeam: { status: 'std', text: '하이빔 어시스트' },
        wheels: { status: 'std', text: '21인치 Audi Sport 멀티 스포크 S 블랙' },
        panoramaRoof: { status: 'std', text: '스위처블 파노라믹 루프' },
        seatMaterial: { status: 'std', text: '나파 가죽 (롬버스 패턴)' },
        interiorTrim: { status: 'std', text: '체스트넛 그레이 인레이' },
        ambient: { status: 'std', text: '멀티컬러 · 다이내믹 인터렉션 라이트' },
        rooflinerBlack: { status: 'std', text: '블랙 헤드라이닝' },
        heatedSeats: { status: 'std', text: '1·2열' }, ventSeats: { status: 'std', text: '1열 (마사지 포함)' },
        hud: 'std', sound: { status: 'std', text: 'B&O 3D 프리미엄 (20채널, 810W)' },
        wirelessCharging: 'std', powerTrunk: { status: 'std', text: '전동식 테일게이트' },
        surroundCamera: { status: 'std', text: '360° 서라운드 뷰' },
        parkingAssist: { status: 'std', text: '파크 어시스트 프로 (원격 주차 포함)' },
        rearSteer: { status: 'std', text: '올 휠 스티어링' },
        semiAuto: { status: 'std', text: 'ACA+ (중앙 유지·차선 변경 보조)' },
        blindSpot: { status: 'std', text: '사이드 어시스트' }
      }
    }
  };

  /* 다른 데이터 파일과 합쳐 쓸 수 있도록 기존 등록분에 추가합니다. */
  var store = window.MBVC_VEHICLES = window.MBVC_VEHICLES || {};
  for (var id in VEHICLES) if (Object.prototype.hasOwnProperty.call(VEHICLES, id)) store[id] = VEHICLES[id];
  window.MBVC_DATA_META = { basis: '벤츠: 각 모델 랜딩페이지 제원 · BMW/Audi: 타브랜드 어프로치북', checked: CHECKED };
})(window);
