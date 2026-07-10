// 여행 중국어 회화 데이터
// 화면 표시: ko(한국어) + pinyin(병음)
// 음성 생성: hanzi(한자) — 화면엔 숨김, TTS 원본
window.PHRASES = [
  // ── 숫자 (기본에 포함, 이어서 낭독) ────
  { id: 1,  cat: "basic", ko: "숫자 1~10", pinyin: "yī, èr, sān, sì, wǔ, liù, qī, bā, jiǔ, shí", hanzi: "一，二，三，四，五，六，七，八，九，十" },
  { id: 2,  cat: "basic", ko: "십·백·천",           pinyin: "shí, yìbǎi, yìqiān",              hanzi: "十，一百，一千" },

  // ── 기본 인사·표현 ────────────────────
  { id: 20, cat: "basic", ko: "안녕하세요",        pinyin: "nǐ hǎo",       hanzi: "你好" },
  { id: 21, cat: "basic", ko: "실례합니다 (저기요)", pinyin: "bù hǎo yìsi",  hanzi: "不好意思" },
  { id: 22, cat: "basic", ko: "여쭤볼게요 (실례지만)", pinyin: "qǐng wèn",    hanzi: "请问" },
  { id: 23, cat: "basic", ko: "감사합니다",        pinyin: "xièxie",       hanzi: "谢谢" },
  { id: 24, cat: "basic", ko: "천만에요",          pinyin: "bú kèqi",      hanzi: "不客气" },
  { id: 25, cat: "basic", ko: "죄송합니다",        pinyin: "duìbuqǐ",      hanzi: "对不起" },
  { id: 26, cat: "basic", ko: "괜찮아요",          pinyin: "méi guānxi",   hanzi: "没关系" },
  { id: 27, cat: "basic", ko: "네 / 맞아요",       pinyin: "duì",          hanzi: "对" },
  { id: 28, cat: "basic", ko: "아니요 / 필요없어요", pinyin: "bú yòng",     hanzi: "不用" },
  { id: 29, cat: "basic", ko: "안녕히 가세요",      pinyin: "zàijiàn",      hanzi: "再见" },
  { id: 30, cat: "basic", ko: "중국어 잘 못해요",   pinyin: "wǒ bú huì shuō zhōngwén", hanzi: "我不会说中文" },
  { id: 33, cat: "basic", ko: "못 알아듣겠어요",    pinyin: "tīng bu dǒng",           hanzi: "听不懂" },

  // ── 쇼핑 ─────────────────────────────
  { id: 40, cat: "shopping", ko: "이거 얼마예요?",   pinyin: "zhège duōshao qián?",   hanzi: "这个多少钱？" },
  { id: 43, cat: "shopping", ko: "이거 주세요",      pinyin: "wǒ yào zhège",          hanzi: "我要这个" },
  { id: 44, cat: "shopping", ko: "카드 되나요?",     pinyin: "kěyǐ shuākǎ ma?",       hanzi: "可以刷卡吗？" },
  { id: 45, cat: "shopping", ko: "알리페이 되나요?", pinyin: "kěyǐ yòng zhīfùbǎo ma?", hanzi: "可以用支付宝吗？" },
  { id: 46, cat: "shopping", ko: "위챗페이 되나요?", pinyin: "kěyǐ yòng wēixìn ma?",   hanzi: "可以用微信吗？" },

  // ── 음식점 ───────────────────────────
  { id: 60, cat: "food", ko: "메뉴 주세요",         pinyin: "qǐng gěi wǒ càidān",     hanzi: "请给我菜单" },
  { id: 61, cat: "food", ko: "이걸로 주세요",       pinyin: "wǒ yào zhège",           hanzi: "我要这个" },
  { id: 62, cat: "food", ko: "안 맵게 해주세요",    pinyin: "bú yào là",              hanzi: "不要辣" },
  { id: 63, cat: "food", ko: "매운 거 좋아해요",    pinyin: "wǒ xǐhuan chī là",       hanzi: "我喜欢吃辣" },
  { id: 64, cat: "food", ko: "물 주세요",           pinyin: "qǐng gěi wǒ shuǐ",       hanzi: "请给我水" },
  { id: 65, cat: "food", ko: "계산해주세요",        pinyin: "mǎidān",                 hanzi: "买单" },
  { id: 66, cat: "food", ko: "맛있어요",            pinyin: "hěn hǎochī",             hanzi: "很好吃" },
  { id: 71, cat: "food", ko: "맛있는 거 추천해주세요", pinyin: "yǒu shénme hǎochī de tuījiàn ma?", hanzi: "有什么好吃的推荐吗？" },
  { id: 72, cat: "food", ko: "얼마나 기다려야 해요?", pinyin: "yào děng duō jiǔ?",          hanzi: "要等多久？" },
  { id: 73, cat: "food", ko: "예약할 수 있어요?",     pinyin: "kěyǐ yùdìng ma?",          hanzi: "可以预订吗？" },
  { id: 67, cat: "food", ko: "포장해주세요",        pinyin: "dǎbāo",                  hanzi: "打包" },
  { id: 69, cat: "food", ko: "먹고 갈게요 (여기서 먹어요)", pinyin: "zài zhèr chī",     hanzi: "在这儿吃" },
  { id: 70, cat: "food", ko: "차가운 걸로 주세요 (얼음 넣어서)", pinyin: "wǒ yào bīng de", hanzi: "我要冰的" },
  { id: 68, cat: "food", ko: "화장실 어디예요?",    pinyin: "xǐshǒujiān zài nǎr?",    hanzi: "洗手间在哪儿？" },

  // ── 교통 ─────────────────────────────
  { id: 80, cat: "traffic", ko: "여기 가주세요 (지도 보여주며)", pinyin: "qǐng dào zhèlǐ",   hanzi: "请到这里" },
  { id: 81, cat: "traffic", ko: "공항까지 가주세요",  pinyin: "qù jīchǎng",             hanzi: "去机场" },
  { id: 83, cat: "traffic", ko: "여기서 세워주세요",  pinyin: "zhèlǐ tíng",             hanzi: "这里停" },

  // ── 시간 ─────────────────────────────
  { id: 100, cat: "time", ko: "지금 몇 시예요?",       pinyin: "xiànzài jǐ diǎn?",              hanzi: "现在几点？" },
  { id: 101, cat: "time", ko: "대략 얼마나 걸려요?",    pinyin: "dàgài yào duō jiǔ?",            hanzi: "大概要多久？" },
  { id: 102, cat: "time", ko: "10시 / 10시 20분",      pinyin: "shí diǎn, shí diǎn èrshí fēn",   hanzi: "十点，十点二十分" },
  { id: 103, cat: "time", ko: "2시는 两点 (二点 아님)", pinyin: "liǎng diǎn",                    hanzi: "两点" },
  { id: 104, cat: "time", ko: "10시 반 / 10시 15분",   pinyin: "shí diǎn bàn, shí diǎn yí kè",   hanzi: "十点半，十点一刻" },
  { id: 105, cat: "time", ko: "20분 뒤",               pinyin: "èrshí fēnzhōng hòu",            hanzi: "二十分钟后" },
  { id: 106, cat: "time", ko: "1시간 / 반 시간",       pinyin: "yí ge xiǎoshí, bàn ge xiǎoshí",  hanzi: "一个小时，半个小时" },
  { id: 107, cat: "time", ko: "대략 20분요",           pinyin: "dàgài èrshí fēnzhōng",          hanzi: "大概二十分钟" },

];

window.CATEGORIES = [
  { key: "all",       label: "전체" },
  { key: "basic",     label: "👋 기본" },
  { key: "shopping",  label: "🛍️ 쇼핑" },
  { key: "food",      label: "🍜 음식점" },
  { key: "traffic",   label: "🚕 교통" },
  { key: "time",      label: "⏰ 시간" },
];
