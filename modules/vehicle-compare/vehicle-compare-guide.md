# 차량 제원 비교 모듈 (vehicle-compare) 사용 가이드

공통 모듈 위치: `modules/vehicle-compare/`

| 파일 | 역할 |
|---|---|
| `vehicle-data.js` | 모든 차량의 가격·제원·옵션 데이터 (**수정은 이 파일에서만**) |
| `vehicle-compare.js` | 화면 생성·차량 선택·카테고리·차이점 보기·전체 제원 아코디언 |
| `vehicle-compare.css` | 디자인 (모든 클래스 `mbvc-` 접두어 → 기존 페이지 스타일과 충돌 없음) |

전역으로 노출되는 이름은 `window.MercedesCompare`, `window.MBVC_VEHICLES`, `window.MBVC_DATA_META` 세 개뿐입니다.
기존 `vehicle-data.js`(루트, `VEHICLE_DATA`)와는 이름이 달라 함께 써도 충돌하지 않습니다.

---

## 1. 다른 페이지에 적용하는 방법

페이지가 저장소 루트(`e300.html` 등)에 있을 때:

```html
<!-- <head> 안 -->
<link rel="stylesheet" href="modules/vehicle-compare/vehicle-compare.css">

<!-- 섹션을 넣을 위치 -->
<section class="section section-alt" id="compare">
  <div class="container">
    <div class="section-heading">
      <span class="label-en">Specifications &amp; Comparison</span>
      <h2>차량 제원 비교</h2>
      <p>궁금한 차량을 선택하고 성능과 옵션의 차이를 직접 비교해 보세요.</p>
    </div>
    <div class="mbvc-container" id="mbvcE300" data-mbvc-manual></div>
  </div>
</section>
<script src="modules/vehicle-compare/vehicle-data.js"></script>
<script src="modules/vehicle-compare/vehicle-compare.js"></script>
<script>
MercedesCompare.init({
  container: '#mbvcE300',
  baseModel: 'e300-4matic-exclusive',
  defaultCompare: 'e220d-4matic-exclusive',
  compareModels: ['e200-exclusive', 'e220d-4matic-exclusive', 'e450-4matic-exclusive',
                  'bmw-530i-xdrive', 'audi-a6-quattro']
});
</script>
```

**JavaScript 없이 속성만으로 쓰는 방법** (`data-mbvc-manual`을 빼면 자동 초기화):

```html
<div class="mbvc-container"
     data-base-model="e300-4matic-exclusive"
     data-default-compare="e220d-4matic-exclusive"
     data-compare-models="e200-exclusive,e220d-4matic-exclusive,bmw-530i-xdrive"></div>
```

- 같은 요소를 두 번 초기화해도 한 번만 그려집니다.
- 한 페이지에 여러 개를 넣어도 서로 영향을 주지 않습니다.
- 섹션 제목·부제는 페이지 HTML에 두므로 페이지별로 자유롭게 바꿀 수 있습니다.

## 2. 차량 데이터 추가 방법

`vehicle-data.js`의 `V` 객체에 항목을 하나 추가합니다. ID는 소문자·하이픈(`brand-model-trim`)으로 짓습니다.

```js
'bmw-530e': {
  brand: 'BMW', model: '5 Series', name: 'BMW 530e', trim: 'M Sport', short: '530e',
  powertrain: 'phev',                 // gasoline | diesel | phev | ev
  modelYear: 2026, market: 'KR',
  source: { page: 'bmw.co.kr', note: 'BMW 코리아 가격표', checked: '2026-11-20' },
  price: { value: 89900000 },         // 원 단위 숫자 (콤마·'만' 쓰지 않음)
  specs: {
    systemPower: 299,                 // 숫자만. 단위는 모듈이 붙임 (ps)
    systemTorque: { value: 45.9, note: '450 Nm 환산' },
    height: { value: 1515, verify: true, note: '자료마다 다름' }   // → '확인 필요'
  },
  equipment: {
    hud: 'std',                                   // std 기본 | opt 선택 | na 미적용 | check 확인 필요
    sound: { status: 'opt', text: 'Bowers & Wilkins' },
    ventSeats: 'check'
  },
  recommend: ['출퇴근은 전기로, 장거리는 엔진으로 타고 싶은 고객']   // 선택
}
```

**입력 규칙**

- 모르는 값은 **넣지 않습니다** → 화면에 `정보 없음`으로 표시되고 차이 비교에서 제외됩니다. 추정값 금지.
- 자료끼리 값이 다르면 하나를 고르지 말고 `verify: true`(제원) 또는 `'check'`(옵션)로 둡니다.
- 단위 기준: 출력 ps (1 kW = 1.35962 ps), 토크 kg·m (1 kg·m = 9.80665 Nm), 연비 km/L, 전비 km/kWh, 길이 mm, 무게 kg, 용량 L.
- 구동방식에 맞지 않는 항목(디젤의 전기 주행거리 등)은 자동으로 `해당 없음` 처리됩니다.
- 사용 가능한 항목 키 목록은 브라우저 콘솔에서 `MercedesCompare.fields`로 확인할 수 있습니다.

## 3. 기준 차량 변경 방법

`init`의 `baseModel`(또는 `data-base-model`)만 바꿉니다. 기준 차량 카드, 표의 기준 열, `○○ 전체 제원 보기` 아코디언이 모두 같은 데이터로 바뀝니다.

```js
baseModel: 'e450-4matic-exclusive'
```

`e200-avantgarde`처럼 `aliases`에 등록된 다른 이름도 사용할 수 있습니다.

## 4. 비교 후보 차량 설정 방법

- `compareModels`: 선택 목록에 나올 차량 ID 배열. 브랜드별(Mercedes-Benz → BMW → Audi → 기타)로 자동 묶입니다.
- 등록되지 않은 ID는 목록에서 빠지고 콘솔에 경고만 남습니다 (화면 오류 없음).
- `compareModels`를 생략하면 등록된 모든 차량이 후보가 됩니다.
- `defaultCompare`: 처음 표시할 비교 차량. 생략하면 목록의 첫 차량.

## 5. 가격·사양 업데이트 방법

1. `vehicle-data.js`에서 해당 차량의 `price.value` 또는 `specs` / `equipment` 값을 수정합니다.
2. 같은 차량의 `source.checked` 날짜를 갱신하고, 전체 확인일은 파일 끝 `MBVC_DATA_META.checked`를 바꿉니다.
3. 이 파일을 쓰는 모든 페이지에 동시에 반영됩니다. HTML은 수정할 필요가 없습니다.
4. 배포 후 바로 반영되지 않으면 브라우저 캐시 때문이므로, HTML의 스크립트 주소에 `?v=20261120`처럼 버전을 붙여 갱신합니다.

## 6. GitHub Pages 경로 설정 방법

- 사이트 주소: `https://jnohjingyu.github.io/e-class/` → 모듈 주소는 `https://jnohjingyu.github.io/e-class/modules/vehicle-compare/…`
- 저장소 루트의 HTML(`e220d.html` 등)에서는 `modules/vehicle-compare/파일명` 상대경로를 사용합니다.
- 하위 폴더의 페이지라면 `../modules/vehicle-compare/파일명`처럼 단계를 맞춥니다.
- `/modules/…`처럼 **앞에 `/`를 붙이지 않습니다** (저장소 이름 `/e-class/`가 빠져 404가 납니다).
- 폴더·파일 이름의 대소문자를 정확히 맞춥니다 (GitHub Pages는 대소문자를 구분합니다).
- 다른 저장소의 페이지에서 쓰려면 이 폴더를 그대로 복사하거나, 절대주소 `https://jnohjingyu.github.io/e-class/modules/vehicle-compare/…`를 사용합니다.

---

## 부록. 기존 E220d 페이지에서 발견된 데이터 불일치 (2026-11-20)

| # | 항목 | 내용 | 모듈 처리 |
|---|---|---|---|
| 1 | E300 가격 차이 | 9,480만 − 8,720만 = **760만원**인데 페이지 문구는 "+750만원" | 실제 가격으로 계산(+760만원) 표시, "750만원" 문구 제거 |
| 2 | E220d 헤드업 디스플레이 | 경쟁차 표 "✓ 기본" ↔ E300 비교표 "—", 기본 옵션 목록엔 없음 | `확인 필요` |
| 3 | E220d 전고 | 1,465mm ↔ E300·E450 1,475mm (같은 차체) | 1,465mm 표시 + `확인 필요` |
| 4 | E220d 사운드 시스템 | E300 비교표에서 "—"(미표기) | `확인 필요` |
| 5 | AMG E53 가격 | e53 페이지 1억 4,300만 ↔ hybrid 페이지 1억 4,160만 | e53 페이지 값 사용, 출처 메모에 기록 |
| 6 | E200 트림명 | 페이지 제목 AVANTGARDE ↔ 비교 데이터 Exclusive | `e200-exclusive` + 별칭 `e200-avantgarde` |
| 7 | Audi A6 (e200·e300 페이지) | 세부 트림 미표기 | 트림에 "세부 트림 미표기"로 명시 |
| 8 | 브랜드 가치 ★ | 주관적 평가 | 제외 (우열 판단 금지 원칙) |
| 9 | 변속기 표기 | "9G-TRONIC" ↔ "9G-TRONIC 자동 9단" | 값은 9G-TRONIC 통일, "자동 9단"은 보조 설명 |
| 10 | "반자율 주행" | 정의가 모호 | `반자율 주행 보조` 항목으로 매핑, 경쟁차 원문 그대로 |

## 부록 2. 경쟁차 데이터 출처 변경 (2026-11-20)

BMW·아우디 데이터는 바탕화면 `타브랜드` 폴더의 딜러 어프로치북으로 교체했습니다.
- BMW: `Approach Book 개별본 260907/THE 5 Approach Book 260907.pdf` (2026-09-07)
- Audi: `A6 어프로치.pdf` (A6 26MY)

기존 E클래스 페이지 비교표와 다른 값 (모듈은 어프로치북 값 사용):

| 차량 | 항목 | 기존 페이지 표 | 어프로치북 |
|---|---|---|---|
| BMW 520i | 가격 / 토크 | 6,980만 / 31.0 kg·m | 7,200만 (Base) / 31.6 kg·m |
| BMW 523d xDrive | 가격 / 토크 / 복합연비 | 8,430만 / 40.0 / 14.7 km/L | 8,220만 (Base) / 40.8 / 13.8 km/L (14.7은 후륜 523d) |
| BMW 530i xDrive | 가격 / 토크 | 8,900만 / 40.0 | 8,650만 (Base) / 40.8 |
| BMW 550e xDrive | 가격 | 1억 1,530만 | 1억 1,670만 (M Sport Pro) |
| Audi A6 (e200 표) | 트림 | 미표기 | 40 TFSI Advanced (6,764만) — ID `audi-a6-40-tfsi`, 별칭 `audi-a6` |
| Audi A6 quattro (e300 표) | 트림 / 출력 | 미표기 / 271 ps | 45 TFSI quattro S-line / 271.9 ps — ID `audi-a6-45-tfsi-quattro`, 별칭 `audi-a6-quattro` |
| Audi A6 55 TFSI | 리어 스티어링 | 미적용 | 올 휠 스티어링 기본 |

신규 등록: `bmw-530e` (530e Base, 9,150만 · E350e 비교용).
e200·e300·e450 페이지 본문의 기존 경쟁차 표는 아직 예전 값이므로, 해당 페이지에 모듈을 적용하면 함께 정리됩니다.
