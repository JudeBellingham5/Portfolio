import { Search, Layers, Palette, Code } from 'lucide-react';

export const INITIAL_DATA = {
  hero: {
    heading: '데이터를 수집하고 분석한 뒤, 인사이트를 마케팅 전략으로 연결하는 데이터 분석 기반 마케터',
    subHeading: '데이터를 정리하고 해석해 실행 가능한 마케팅 전략으로 연결합니다.'
  },
  profile: {
    image: 'https://picsum.photos/seed/marketer/600/800',
    info: {
      birth: '199X.XX.XX',
      education: 'OO대학교',
      major: '마케팅 전공',
      doubleMajor: '데이터분석 복수전공',
      gpa: '4.X / 4.5',
      certifications: 'ADsP, SQLD, GAIQ',
      training: '데이터 분석 기반 마케팅 실무 과정 수료'
    }
  },
  projects: [
    {
      id: 1,
      title: '넷플릭스 웹툰 원작 영상화 성공 전략 제안',
      summary: '웹툰 데이터를 분석해 넷플릭스 영상화에 적합한 작품 특성을 도출하고, 이를 바탕으로 성공 전략을 기획한 프로젝트',
      keywords: ['데이터 분석', '콘텐츠 마케팅', '전략 제안'],
      iconName: 'Search',
      image: 'https://picsum.photos/seed/netflix/800/600',
      links: {
        ppt: '',
        report: ''
      },
      details: {
        background: '웹툰 원작 콘텐츠의 영상화 사례는 늘고 있었지만, 어떤 작품이 넷플릭스에 적합한지에 대한 기준은 명확하지 않았다. 단순 인기작 선별이 아니라, 플랫폼 적합성과 반응 지표를 함께 고려한 분석이 필요했다.',
        role: '메인/리드: 데이터 정리, 분석 방향 설정, 결과 해석, 전략 제안\n협업: 발표 구성 및 인사이트 정리',
        execution: '넷플릭스 영상화 사례 데이터와 웹툰 원천 데이터를 정리하고, 작품 특성과 반응 지표를 비교 분석했다. 이를 바탕으로 영상화 적합 작품의 특징과 마케팅 전략 방향을 도출했다.',
        result: '단순 인기보다 서사 확장성과 반응 지표를 함께 고려하는 기준이 중요하다는 점을 정리했다. 또한 데이터 분석 결과를 콘텐츠 선정 기준과 마케팅 전략으로 연결하는 경험을 확보했다.'
      }
    },
    {
      id: 2,
      title: '프랜차이즈 입지 특성과 마케팅 성과 관계 분석',
      summary: '금별맥주와 역전할머니맥주 데이터를 수집·분석해 입지 특성과 마케팅 성과의 관계를 검토한 프로젝트',
      keywords: ['웹 크롤링', '상권 분석', '성과 검토'],
      iconName: 'Layers',
      image: 'https://picsum.photos/seed/franchise/800/600',
      links: {
        ppt: '',
        report: ''
      },
      details: {
        background: '오프라인 프랜차이즈에서 입지 특성이 실제 마케팅 성과와 어떤 관계를 가지는지 정량적으로 검토할 필요가 있었다.',
        role: '메인/리드: 데이터 수집, 전처리, 파생변수 생성, 분석\n협업: 보고서 구성 및 해석 보완',
        execution: '브랜드 매장 데이터를 수집하고, 입지 특성과 성과 지표를 정리했다. 이후 데이터 정제와 변수 보완을 거쳐 브랜드 간 차이를 비교 분석했다.',
        result: '입지 조건과 디지털 성과의 관계를 데이터 기반으로 검토하는 경험을 확보했다. 또한 수집, 정제, 분석, 해석을 연결한 실무형 데이터 분석 흐름을 구축했다.'
      }
    },
    {
      id: 3,
      title: 'KFC 리브랜딩',
      summary: 'KFC의 문제를 데이터 수집 및 자료 조사를 통해 분석하고, 리브랜딩 방향을 제안한 프로젝트',
      keywords: ['브랜드 분석', '소비자 인식', '리브랜딩 전략'],
      iconName: 'Palette',
      image: 'https://picsum.photos/seed/kfc/800/600',
      links: {
        ppt: '',
        report: ''
      },
      details: {
        background: 'KFC가 현재 소비자에게 어떤 이미지로 인식되고 있으며, 어떤 지점에서 브랜드 재정의가 필요한지 파악할 필요가 있었다.',
        role: '메인/리드: 자료 조사, 소비자 인식 분석, 문제 정의, 방향 제안\n협업: 발표 흐름 및 전략 논의',
        execution: '브랜드 관련 자료와 소비자 반응을 조사하고, 문제를 이미지·포지셔닝·기대 차이 관점에서 구조화했다.',
        result: '정성 자료를 바탕으로 브랜드 문제를 구조화하고, 이를 리브랜딩 방향으로 연결하는 경험을 확보했다.'
      }
    },
    {
      id: 4,
      title: 'Streamlit 기반 GUI 앱 구현',
      summary: '이별 극복 테스트를 기획하고, Streamlit을 활용해 실제로 구현 및 배포한 프로젝트',
      keywords: ['서비스 구현', '시각화', '배포 경험'],
      iconName: 'Code',
      image: 'https://picsum.photos/seed/streamlit/800/600',
      links: {
        ppt: '',
        report: ''
      },
      details: {
        background: '기획한 서비스를 실제로 동작하는 형태로 구현하고, 결과를 사용자에게 직관적으로 보여줄 수 있는 구조가 필요했다.',
        role: '메인/리드: 기획, 로직 설계, UI 구성, 구현, 배포',
        execution: 'Streamlit을 활용해 사용자 입력, 결과 분류, 시각화, 저장 흐름을 직접 설계하고 구현했다.',
        result: '기획을 실제 서비스 형태로 전환하는 실행력을 확보했고, 분석 결과를 사용자 경험으로 연결하는 역량을 강화했다.'
      }
    }
  ],
  competencies: [
    { title: '데이터 수집 (Crawling)', description: 'Python(Selenium, BeautifulSoup)을 활용해 정형/비정형 데이터를 수집합니다.' },
    { title: '데이터 전처리 (Preprocessing)', description: 'Pandas, NumPy를 활용해 분석에 적합한 형태로 데이터를 정제합니다.' },
    { title: '데이터 시각화 (Visualization)', description: 'Matplotlib, Seaborn, Tableau를 활용해 인사이트를 시각적으로 전달합니다.' },
    { title: '통계 분석 (Statistics)', description: '가설 검정, 회귀 분석 등 통계적 방법론을 통해 인과 관계를 파악합니다.' },
    { title: '마케팅 전략 (Strategy)', description: '분석 결과를 바탕으로 실행 가능한 마케팅 액션 아이템을 도출합니다.' },
    { title: '성과 측정 (Measurement)', description: 'GA4, GTM 등을 활용해 마케팅 캠페인의 성과를 정량적으로 측정합니다.' },
    { title: '커뮤니케이션 (Communication)', description: '기술적 분석 결과를 비즈니스 언어로 번역하여 유관 부서와 소통합니다.' }
  ],
  contact: {
    email: 'example@email.com'
  }
};
