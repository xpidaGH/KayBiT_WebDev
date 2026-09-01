import { UserGuideContent } from '../userGuideTypes';

// Chinese (中文 - 简体)
export const zhGuide: UserGuideContent = {
  title: 'Web 开发原型与架构参考 用户指南',
  subtitle: '掌握现代 Web 系统的 11 种基础架构模式与工程实践',
  badge: '交互式教学参考实验室',
  tableOfContents: {
    overview: '1. 教学概述与目标',
    navigation: '2. 界面与导航操作',
    archetypes: '3. 11 个核心原型目录',
    modes: '4. 五大深度探索模式',
    studentGuide: '5. 学生学习与实战路径',
    faq: '6. 常见问题解答 (FAQ)',
  },
  sections: {
    overview: {
      title: '1. 教学概述与设计目标',
      desc: '现代 Web 工程涵盖了从超高性能的静态内容分发到复杂的分布式实时交易型 Web 应用。本实验室提供了 11 个生产级原型，帮助学习者深入理解渲染模式、状态同步、数据分层及安全防御机制。',
      highlights: [
        '11 个具备真实交互逻辑的原型，杜绝无意义的模拟占位。',
        '五层架构体系剖析：表现层、客户端状态、API 协议、数据库和缓存层。',
        'OWASP Top 10 真实威胁建模与经过生产验证的防御代码。',
        '分级实战挑战：热身练习、核心工程挑战与综合实战大作业。',
      ],
    },
    navigation: {
      title: '2. 界面与导航指南',
      desc: '利用控制面板在原型、视口模拟器以及深层技术架构之间自如切换。',
      steps: [
        { title: '左侧课程导航栏', detail: '按分类（网站 vs Web应用）过滤原型，或使用搜索框查找特定模式（如 SSG、SSR、RBAC）。' },
        { title: '顶部模式切换器', detail: '在交互预览、架构剖析、安全防御、实战挑战和源码脚手架间随时切换。' },
        { title: '视口断点模拟器', detail: '实时测试桌面端 (100%)、平板端 (768px) 和移动端 (375px) 的响应式适配。' },
        { title: '源码脚手架复制', detail: '点击“复制蓝图”按钮，即可将高质量 TypeScript 组件和类型定义直接复制到本地。' },
      ],
    },
    archetypes: {
      title: '3. 11 个核心原型目录',
      desc: '深入对比两大 Web 形态：内容型网站与事务型 Web 应用程序。',
      websites: [
        { name: '博客 / 内容发布站', pattern: 'SSG + ISR', desc: '阅读进度条、Markdown AST 解析、分类索引与 SEO 结构化数据。' },
        { name: '电商购物商城', pattern: '混合渲染 (SSG + CSR)', desc: '多维多属性筛选、滑出式购物车、优惠券计算与订单结账状态机。' },
        { name: '个人技术作品集', pattern: 'Jamstack / SSG', desc: '模态框项目深度剖析、Core Web Vitals 性能优化与联系表单校验。' },
        { name: '企业 B2B 官网', pattern: 'SSR + Headless CMS', desc: '交互式 ROI 商业价值计算器、服务矩阵、客户评价与咨询预约。' },
        { name: '产品首发着陆页 (Landing)', pattern: '边缘缓存 SSG', desc: '发布倒计时时钟、年付/月付切换（20% 折扣引擎）与销售线索捕获。' },
        { name: '教学 Wiki 与技术文档', pattern: '搜索索引 SSG', desc: '多级折叠目录、即时算法搜索、代码高亮与有用度评价反馈。' },
      ],
      webapps: [
        { name: 'SaaS 遥测与监控看板', pattern: 'CSR + 实时流', desc: '延迟与错误直方图、带一次性展示的安全 API 密钥生成器、RBAC 团队权限。' },
        { name: '工程师技术社交网络', pattern: '乐观 CSR + 事件流', desc: '快拍光环、富代码块发布器、乐观点赞机制与嵌套评论树。' },
        { name: '企业角色受控门户 (RBAC)', pattern: 'SSO / 企业受控门户', desc: '角色即时切换（学生、教师、管理员）、带签名的防盗链文档下载与验证二维码。' },
        { name: '敏捷项目管理看板 (Kanban)', pattern: '看板状态机', desc: '4 阶段冲刺看板、故事点速度统计、优先级标签与原子化流转机制。' },
        { name: '在线教育 LMS 平台', pattern: '交互式课程引擎', desc: '视频播放器模拟、章节进度清单、即时打分与解析的知识测验、结业证书。' },
      ],
    },
    modes: {
      title: '4. 五大深度探索模式',
      desc: '每个原型均配备 5 种专门视角的教学解析。',
      items: [
        { name: '交互式实时预览', desc: '亲身体验完整的前端交互逻辑与触控目标适配。' },
        { name: '架构与技术栈', desc: '深入分析系统在表现层、状态、API、存储和缓存的实现。' },
        { name: '安全与威胁防御', desc: '剖析 OWASP 典型漏洞与防御代码范式。' },
        { name: '学生分级挑战', desc: '从热身到综合大作业，动手实战巩固技能。' },
        { name: '源码脚手架', desc: '获取标准化、类型安全的 TypeScript 模板代码。' },
      ],
    },
    studentGuide: {
      title: '5. 学习与实战建议',
      desc: '帮助计算机专业学生与工程师快速提升软件工程能力的建议。',
      tips: [
        '对比不同渲染模式（SSG vs SSR vs CSR）的适用边界与取舍。',
        '在编写任何服务端接口前，务必先审查安全防御清单。',
        '在 375px 移动端视口下验证排版与触摸热区。',
      ],
    },
    faq: {
      title: '6. 常见问题解答 (FAQ)',
      items: [
        {
          q: '网站 (Website) 与 Web 应用程序 (Web App) 的核心区别是什么？',
          a: '网站优先考虑内容分发效率、SEO 优化与全局边缘缓存；Web 应用程序则重点处理高频客户端状态变更、多用户事务与细粒度权限控制。',
        },
      ],
    },
  },
};

// Japanese (日本語)
export const jaGuide: UserGuideContent = {
  title: 'Web開発アーキタイプ ユーザーガイド＆学習リファレンス',
  subtitle: 'モダンWebシステムを支える11の基本アーキテクチャパターンを習得',
  badge: 'インタラクティブ教育リファレンス',
  tableOfContents: {
    overview: '1. 教育的概要と目的',
    navigation: '2. UIとナビゲーション',
    archetypes: '3. 11の基本アーキタイプ一覧',
    modes: '4. 5つの学習モード',
    studentGuide: '5. 学習ステップと推奨事項',
    faq: '6. よくある質問 (FAQ)',
  },
  sections: {
    overview: {
      title: '1. 教育的概要と学習目的',
      desc: '現代のWebエンジニアリングは、高速な静的配信サイトから分散リアルタイムWebアプリまで多岐にわたります。本ラボは11の代表的アーキタイプの完全な実装を提供します。',
      highlights: [
        'モックなしのリアルな状態管理を備えた11の対話型アーキタイプ。',
        '5層アーキテクチャ分解：プレゼンテーション、クライアント状態、API、DB、キャッシュ。',
        'OWASP Top 10のセキュリティ脅威モデルと検証済みの防御コード。',
        '段階的な演習課題：ウォームアップ、コア課題、発展的キャップストーン。',
      ],
    },
    navigation: {
      title: '2. 操作ガイドとナビゲーション',
      desc: 'テンプレート、画面サイズシミュレータ、技術解説モードを直感的に切り替えられます。',
      steps: [
        { title: 'サイドバー（カリキュラムナビ）', detail: 'カテゴリ別（Webサイト vs Webアプリ）の絞り込みや検索機能。' },
        { title: '上部モード切替タブ', detail: 'プレビュー、アーキテクチャ、セキュリティ、演習、ソースコードをワンクリックで切替。' },
        { title: '画面サイズシミュレータ', detail: 'デスクトップ (100%)、タブレット (768px)、モバイル (375px) のレスポンシブ検証。' },
        { title: 'ブループリントのコピー', detail: 'TypeScriptのクリーンなソースコードをローカル環境にコピー。' },
      ],
    },
    archetypes: {
      title: '3. 11の基本アーキタイプ一覧',
      desc: 'コンテンツ型Webサイトとトランザクション型Webアプリケーションの比較。',
      websites: [
        { name: 'ブログ / コンテンツサイト', pattern: 'SSG + ISR', desc: '読了進捗バー、Markdown ASTパーサー、カテゴリ分類、SEO構造化データ。' },
        { name: 'Eコマースストア', pattern: 'ハイブリッド (SSG + CSR)', desc: 'ファセット検索、スライド式カート、クーポン計算、チェックアウト状態遷移。' },
        { name: 'ポートフォリオ', pattern: 'Jamstack / SSG', desc: 'モーダル詳細ケーススタディ、Core Web Vitals最適化、問い合わせフォーム。' },
        { name: '企業コーポレートサイト', pattern: 'SSR + Headless CMS', desc: 'インタラクティブROI計算機、サービス一覧、顧客事例、面談予約。' },
        { name: '製品ローンチLP', pattern: 'エッジキャッシュ SSG', desc: '公開カウントダウン、年額/月額（20%割引）切替、リード獲得。' },
        { name: '教育Wiki・技術ドキュメント', pattern: '検索インデックス型 SSG', desc: '階層ツリー、リアルタイム検索、コードブロック、評価フィードバック。' },
      ],
      webapps: [
        { name: 'SaaSテレメトリダッシュボード', pattern: 'CSR + リアルタイム配信', desc: '遅延ヒストグラム、ワンタイム表示APIキー生成、RBACチーム管理。' },
        { name: 'エンジニア向けSNS', pattern: '楽観的CSR + イベント', desc: 'ストーリーズ、コード埋め込み投稿、楽観的いいね、スレッド返信。' },
        { name: 'ロール制御ポータル (RBAC)', pattern: 'SSO / 企業ポータル', desc: '役割切替（学生、教員、管理者）、署名付きダウンロード、検証QRコード。' },
        { name: 'プロジェクト管理カンバン', pattern: 'カンバン状態マシン', desc: '4段階スプリントボード、ベロシティ追跡、優先度、状態遷移。' },
        { name: 'オンライン学習LMSプラットフォーム', pattern: '対話型コースエンジン', desc: '動画シミュレータ、進捗チェックリスト、解説付き小テスト、修了証書。' },
      ],
    },
    modes: {
      title: '4. 5つの学習モード',
      desc: 'すべてのアーキタイプに備わった多角的な教育視点。',
      items: [
        { name: '対話型プレビュー', desc: '動作するUIと直接触れ合い、使い心地とレイアウトを確認。' },
        { name: 'アーキテクチャ＆スタック', desc: '5層の構造と推奨ライブラリを体系的に理解。' },
        { name: 'セキュリティと脅威対策', desc: '実際の脆弱性パターンと防御コードを学習。' },
        { name: '学生向け演習課題', desc: '実践的なプログラミング課題に挑戦。' },
        { name: 'ソースコード設計図', desc: '型安全なTypeScriptスターターコード。' },
      ],
    },
    studentGuide: {
      title: '5. 学習ステップと推奨事項',
      desc: 'ソフトウェア工学の理解を深めるための実践的ヒント。',
      tips: [
        'SSG、SSR、CSRのレンダリング方式の違いを用途別に比較してください。',
        'バックエンドを実装する前に、必ずセキュリティ設計を確認しましょう。',
        'モバイル表示（375px）でレイアウト崩れがないか確認してください。',
      ],
    },
    faq: {
      title: '6. よくある質問 (FAQ)',
      items: [
        {
          q: 'WebサイトとWebアプリケーションの最大の違いは何ですか？',
          a: 'Webサイトはコンテンツ配信速度とSEO、エッジキャッシュを重視します。Webアプリは動的なクライアント状態の更新、ユーザー権限、トランザクション処理を重視します。',
        },
      ],
    },
  },
};

// Indonesian (Bahasa Indonesia)
export const idGuide: UserGuideContent = {
  title: 'Panduan Pengguna & Referensi Arketipe Web',
  subtitle: 'Kuasai 11 pola arsitektur fundamental sistem web modern',
  badge: 'Referensi Pembelajaran Interaktif',
  tableOfContents: {
    overview: '1. Ringkasan Pembelajaran',
    navigation: '2. Antarmuka & Navigasi',
    archetypes: '3. Katalog 11 Arketipe',
    modes: '4. Mode Eksplorasi',
    studentGuide: '5. Panduan Mahasiswa',
    faq: '6. Pertanyaan Umum (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Ringkasan & Tujuan Pembelajaran',
      desc: 'Rekayasa web modern mencakup situs konten statis super cepat hingga aplikasi web transaksional real-time terdistribusi. Laboratorium ini menyediakan 11 arketipe siap produksi.',
      highlights: [
        '11 arketipe interaktif dengan state nyata tanpa komponen tiruan kosong.',
        'Pembagian 5 lapisan: Presentasi, State Klien, API, Basis Data, dan Caching.',
        'Pemodelan ancaman OWASP Top 10 dan contoh kode mitigasi teruji.',
        'Tantangan koding bertingkat: Pemanasan, Tantangan Inti, dan Tugas Akhir Capstone.',
      ],
    },
    navigation: {
      title: '2. Panduan Antarmuka & Navigasi',
      desc: 'Beralih dengan mudah antara templat, ukuran layar, dan analisis arsitektur.',
      steps: [
        { title: 'Navigasi Samping', detail: 'Saring berdasarkan Situs Web atau Aplikasi Web, atau cari pola seperti SSG, SSR, atau RBAC.' },
        { title: 'Pengubah Mode', detail: 'Pilih antara Pratinjau Interaktif, Arsitektur, Keamanan, Tantangan, dan Kode Sumber.' },
        { title: 'Simulator Perangkat', detail: 'Uji responsivitas pada Desktop (100%), Tablet (768px), dan Ponsel (375px).' },
        { title: 'Salin Blueprint', detail: 'Salin kode komponen TypeScript bersih ke lingkungan lokal Anda.' },
      ],
    },
    archetypes: {
      title: '3. Katalog 11 Arketipe Web',
      desc: 'Perbandingan antara Situs Konten dan Aplikasi Web Transaksional.',
      websites: [
        { name: 'Blog / Situs Konten', pattern: 'SSG + ISR', desc: 'Indikator baca, parser markdown AST, kategori, dan metadata SEO.' },
        { name: 'Toko E-commerce', pattern: 'Hibrida (SSG + CSR)', desc: 'Filter produk, laci keranjang geser, diskon promo, dan state checkout.' },
        { name: 'Portofolio Profesional', pattern: 'Jamstack / SSG', desc: 'Studi kasus modal, optimasi Core Web Vitals, dan formulir kontak.' },
        { name: 'Situs Bisnis Perusahaan', pattern: 'SSR + Headless CMS', desc: 'Kalkulator ROI interaktif, daftar layanan, testimoni, dan janji temu.' },
        { name: 'Landing Page Peluncuran', pattern: 'SSG Edge Cached', desc: 'Hitung mundur peluncuran, pengalih harga tahunan (-20%), dan formulir prospek.' },
        { name: 'Wiki Pendidikan & Dokumentasi', pattern: 'SSG Terindeks', desc: 'Navigasi hierarki, pencarian instan, blok kode, dan evaluasi umpan balik.' },
      ],
      webapps: [
        { name: 'Dashboard SaaS', pattern: 'CSR + Telemetri Realtime', desc: 'Histogram latensi, generator kunci API aman, dan manajemen izin tim RBAC.' },
        { name: 'Media Sosial Pengembang', pattern: 'CSR Optimis', desc: 'Stories, editor postingan kode, likes optimis, dan utas komentar.' },
        { name: 'Portal Berbasis Peran (RBAC)', pattern: 'SSO / Portal Korporat', desc: 'Ganti peran (Mahasiswa, Dosen, Admin), unduhan terenkripsi, dan lencana QR.' },
        { name: 'Papan Manajemen Proyek Kanban', pattern: 'Mesin State Kanban', desc: 'Papan sprint 4 tahap, story points, prioritas, dan transisi tugas.' },
        { name: 'Platform E-learning LMS', pattern: 'Mesin Kursus Interaktif', desc: 'Simulator video, daftar kemajuan, kuis berpenjelasan, dan sertifikat digital.' },
      ],
    },
    modes: {
      title: '4. Mode Pembelajaran',
      desc: 'Lima perspektif edukatif untuk setiap arketipe.',
      items: [
        { name: 'Pratinjau Interaktif', desc: 'Uji langsung fungsionalitas UI secara live.' },
        { name: 'Arsitektur & Stack', desc: 'Pelajari pemisahan lapisan dan aliran data aplikasi.' },
        { name: 'Keamanan & Ancaman', desc: 'Pahami kerentanan OWASP dan teknik pencegahannya.' },
        { name: 'Tantangan Mahasiswa', desc: 'Selesaikan latihan pemrograman bertingkat.' },
        { name: 'Cetak Biru Kode Sumber', desc: 'Gunakan template TypeScript yang modular dan siap pakai.' },
      ],
    },
    studentGuide: {
      title: '5. Panduan & Tips Mahasiswa',
      desc: 'Rekomendasi untuk mempercepat penguasaan rekayasa web.',
      tips: [
        'Pahami perbedaan mendasar strategi render (SSG vs SSR vs CSR).',
        'Selalu periksa aspek keamanan sebelum menulis logika backend.',
        'Pastikan pengujian pada ukuran ponsel 375px berjalan sempurna.',
      ],
    },
    faq: {
      title: '6. Pertanyaan Umum (FAQ)',
      items: [
        {
          q: 'Apa perbedaan utama antara Situs Web dan Aplikasi Web?',
          a: 'Situs web mengutamakan kecepatan distribusi konten dan SEO. Aplikasi web fokus pada mutasi state klien yang kompleks, autentikasi peran, dan transaksi.',
        },
      ],
    },
  },
};

// Turkish (Türkçe)
export const trGuide: UserGuideContent = {
  title: 'Web Geliştirme Arketipleri Kullanım Kılavuzu',
  subtitle: 'Modern web sistemlerinin 11 temel mimari modelinde uzmanlaşın',
  badge: 'İnteraktif Eğitim Referansı',
  tableOfContents: {
    overview: '1. Pedagojik Genel Bakış',
    navigation: '2. Arayüz ve Navigasyon',
    archetypes: '3. 11 Temel Arketip Kataloğu',
    modes: '4. Keşif Modları',
    studentGuide: '5. Öğrenci Gelişim Rehberi',
    faq: '6. Sıkça Sorulan Sorular (SSS)',
  },
  sections: {
    overview: {
      title: '1. Pedagojik Genel Bakış ve Amaç',
      desc: 'Modern web mühendisliği, ultra hızlı statik sitelerden dağıtık gerçek zamanlı web uygulamalarına kadar uzanır. Bu laboratuvar 11 eksiksiz üretim arketipi sunar.',
      highlights: [
        'Gerçek durum yönetimine sahip 11 interaktif arketip.',
        '5 Katmanlı Mimari: Sunum, İstemci Durumu, API, Veritabanı ve Önbellek.',
        'OWASP Top 10 tehdit modellemesi ve doğrulanmış güvenlik kodları.',
        'Kademeli öğrenci görevleri: Isınma, Ana Görev ve İleri Düzey Bitirme Projesi.',
      ],
    },
    navigation: {
      title: '2. Arayüz ve Navigasyon Kılavuzu',
      desc: 'Şablonlar, ekran simülatörleri ve mimari analizler arasında kolayca geçiş yapın.',
      steps: [
        { title: 'Kenar Çubuğu', detail: 'Web Siteleri veya Web Uygulamaları kategorisine göre filtreleyin veya desen arayın.' },
        { title: 'Mod Değiştirici', detail: 'Önizleme, Mimari, Güvenlik, Görevler ve Kaynak Kod arasında geçiş yapın.' },
        { title: 'Cihaz Simülatörü', detail: 'Masaüstü (100%), Tablet (768px) ve Mobil (375px) responsive uyumluluğunu test edin.' },
        { title: 'Kod Kopyalama', detail: 'Temiz TypeScript bileşenlerini yerel projenize kopyalayın.' },
      ],
    },
    archetypes: {
      title: '3. 11 Temel Arketip Kataloğu',
      desc: 'İçerik Siteleri ve İşlemsel Web Uygulamalarının karşılaştırması.',
      websites: [
        { name: 'Blog / İçerik Sitesi', pattern: 'SSG + ISR', desc: 'Okuma ilerleme çubuğu, markdown ayrıştırıcı, kategoriler ve SEO verileri.' },
        { name: 'E-Ticaret Mağazası', pattern: 'Hibrit (SSG + CSR)', desc: 'Filtreler, açılır sepet çekmecesi, kupon indirimi ve ödeme durum makinesi.' },
        { name: 'Profesyonel Portfolyo', pattern: 'Jamstack / SSG', desc: 'Modal vaka çalışmaları, Core Web Vitals optimizasyonu ve iletişim formu.' },
        { name: 'Kurumsal B2B Sitesi', pattern: 'SSR + Headless CMS', desc: 'İnteraktif ROI hesaplayıcı, hizmet matrisi, referanslar ve randevu alma.' },
        { name: 'Açılış Sayfası (Landing Page)', pattern: 'Edge Cached SSG', desc: 'Geri sayım sayacı, yıllık indirim seçeneği (%20) ve potansiyel müşteri formu.' },
        { name: 'Eğitim Vikisi ve Dokümantasyon', pattern: 'Arama İndeksli SSG', desc: 'Ağaç menü, anlık arama, kod blokları ve geri bildirim sistemi.' },
      ],
      webapps: [
        { name: 'SaaS Kontrol Paneli', pattern: 'CSR + Gerçek Zamanlı Akış', desc: 'Gecikme histogramları, güvenli API anahtarı üretici ve RBAC ekip yönetimi.' },
        { name: 'Geliştirici Sosyal Ağı', pattern: 'Optimistik CSR', desc: 'Hikayeler, kod parçacıklı gönderi editörü, beğeniler ve yorum zincirleri.' },
        { name: 'Rol Korumalı Portal (RBAC)', pattern: 'SSO / Kurumsal Portal', desc: 'Rol değişimi (Öğrenci, Akademisyen, Admin), güvenli indirmeler ve QR doğrulama.' },
        { name: 'Kanban Proje Yönetimi', pattern: 'Kanban Durum Makinesi', desc: '4 aşamalı sprint panosu, hikaye puanları, öncelikler ve görev geçişleri.' },
        { name: 'E-Öğrenme LMS Platformu', pattern: 'İnteraktif Kurs Motoru', desc: 'Video simülatörü, ders kontrol listesi, açıklamalı test ve dijital sertifika.' },
      ],
    },
    modes: {
      title: '4. Keşif Modları',
      desc: 'Her arketip için 5 özel eğitsel perspektif.',
      items: [
        { name: 'İnteraktif Önizleme', desc: 'Çalışan arayüz ile doğrudan etkileşim kurun.' },
        { name: 'Mimari ve Yığın', desc: 'Katmanlı mimariyi ve veri akışını inceleyin.' },
        { name: 'Güvenlik ve Tehditler', desc: 'OWASP risklerini ve savunma kodlarını öğrenin.' },
        { name: 'Öğrenci Görevleri', desc: 'Üç zorluk seviyesinde pratik kodlama yapın.' },
        { name: 'Kaynak Kod İskeleti', desc: 'Kullanıma hazır TypeScript şablonları.' },
      ],
    },
    studentGuide: {
      title: '5. Öğrenciler İçin Tavsiyeler',
      desc: 'Yazılım mühendisliğinde hızlı ilerleme sağlamak için ipuçları.',
      tips: [
        'SSG, SSR ve CSR arasındaki kullanım farklarını analiz edin.',
        'Uygulama güvenliğini kodlamaya başlamadan önce planlayın.',
        'Mobil (375px) ekranlarda dokunmatik hedefleri ve taşmaları test edin.',
      ],
    },
    faq: {
      title: '6. Sıkça Sorulan Sorular (SSS)',
      items: [
        {
          q: 'Web Sitesi ile Web Uygulaması arasındaki temel fark nedir?',
          a: 'Web siteleri içerik dağıtımı, SEO ve CDN önbelleğe odaklanır. Web uygulamaları ise dinamik durum yönetimi, kullanıcı izinleri ve işlemlere odaklanır.',
        },
      ],
    },
  },
};

// Swahili (Kiswahili)
export const swGuide: UserGuideContent = {
  title: 'Mwongozo wa Mtumiaji na Marejeleo ya Miundo ya Wavuti',
  subtitle: 'Jifunze mifumo 11 ya msingi ya usanifu wa mifumo ya kisasa ya wavuti',
  badge: 'Rejea ya Kielimu na Mwingiliano',
  tableOfContents: {
    overview: '1. Muhtasari wa Kielimu',
    navigation: '2. Muonekano na Urambazaji',
    archetypes: '3. Katalogi ya Miundo 11',
    modes: '4. Njia za Uchunguzi',
    studentGuide: '5. Mwongozo wa Wanafunzi',
    faq: '6. Maswali Yanayoulizwa Mara kwa Mara (FAQ)',
  },
  sections: {
    overview: {
      title: '1. Muhtasari wa Kielimu na Malengo',
      desc: 'Uhandisi wa kisasa wa wavuti unajumuisha tovuti za haraka za kutoa maudhui hadi programu tata za biashara za wakati halisi. Maabara hii inatoa mifano 11 kamili ya kiwango cha uzalishaji.',
      highlights: [
        'Miundo 11 inayofanya kazi na mwingiliano halisi.',
        'Uchambuzi wa ngazi 5: Muonekano, Hali ya Mteja, API, Hifadhidata, na Akiba.',
        'Uchambuzi wa usalama wa OWASP Top 10 na mifano ya kuzuia mashambulizi.',
        'Changamoto za wanafunzi: Mazoezi ya Awali, Changamoto Kuu, na Mradi Mkuu.',
      ],
    },
    navigation: {
      title: '2. Mwongozo wa Urambazaji',
      desc: 'Badilisha kwa urahisi kati ya violezo, vifaa vya skrini, na uchambuzi wa usanifu.',
      steps: [
        { title: 'Menyu ya Pembeni', detail: 'Chuja kwa Tovuti au Programu za Wavuti na utafute mifumo kama SSG, SSR, au RBAC.' },
        { title: 'Kibadilisha Njia', detail: 'Badili kati ya Muonekano, Usanifu, Usalama, Mazoezi, na Msimbo Chanzo.' },
        { title: 'Kifanisi cha Vifaa', detail: 'Pima muonekano kwenye Kompyuta (100%), Kompyuta Mpakato (768px), na Simu (375px).' },
        { title: 'Nakili Msimbo', detail: 'Nakili msimbo safi wa TypeScript moja kwa moja kwenye kompyuta yako.' },
      ],
    },
    archetypes: {
      title: '3. Katalogi ya Miundo 11 ya Wavuti',
      desc: 'Ulinganisho kati ya Tovuti za Maudhui na Programu za Wavuti.',
      websites: [
        { name: 'Blogu / Tovuti ya Maudhui', pattern: 'SSG + ISR', desc: 'Mwongozo wa usomaji, mchambuzi wa markdown, makundi, na SEO.' },
        { name: 'Duka la Mtandaoni', pattern: 'Mseto (SSG + CSR)', desc: 'Vichujio vya bidhaa, kikapu kinachoteleza, punguzo, na mfumo wa malipo.' },
        { name: 'Tovuti ya Wasifu (Portfolio)', pattern: 'Jamstack / SSG', desc: 'Mifano ya miradi, maboresho ya kasi, na fomu ya mawasiliano.' },
        { name: 'Tovuti ya Kampuni ya B2B', pattern: 'SSR + Headless CMS', desc: 'Kikokotoo cha faida (ROI), huduma, shuhuda, na uhifadhi wa miadi.' },
        { name: 'Ukurasa wa Kutua (Landing)', pattern: 'SSG Edge Cached', desc: 'Saa ya kuhesabu muda, punguzo la 20%, na usajili wa wateja wapya.' },
        { name: 'Wiki ya Kielimu & Nyaraka', pattern: 'SSG Yenye Utafutaji', desc: 'Orodha inayojikunja, utafutaji wa papo hapo, na tathmini ya maudhui.' },
      ],
      webapps: [
        { name: 'Dashibodi ya SaaS', pattern: 'CSR + Takwimu za Papo Hapo', desc: 'Takwimu za mtandao, funguo salama za API, na haki za ufikiaji (RBAC).' },
        { name: 'Mtandao wa Kijamii wa Wahandisi', pattern: 'CSR ya Matumaini', desc: 'Hadithi, mhariri wa msimbo, kupenda papo hapo, na maoni yaliyofungamana.' },
        { name: 'Tovuti Yenye Haki za Ufikiaji', pattern: 'SSO / Tovuti ya Taasisi', desc: 'Kubadili majukumu (Mwanafunzi, Mwalimu, Msimamizi) na QR ya uthibitisho.' },
        { name: 'Bodi ya Usimamizi wa Miradi (Kanban)', pattern: 'Mfumo wa Hali ya Kanban', desc: 'Bodi ya hatua 4, alama za hadithi, vipaumbele, na uhamishaji wa kazi.' },
        { name: 'Jukwaa la Mafunzo Mtandaoni (LMS)', pattern: 'Mfumo wa Masomo wa Kuingiliana', desc: 'Mchezaji wa video, orodha ya masomo, mtihani wenye maelezo, na cheti.' },
      ],
    },
    modes: {
      title: '4. Njia za Uchunguzi',
      desc: 'Mitazamo 5 ya kielimu kwa kila muundo.',
      items: [
        { name: 'Muonekano wa Kuingiliana', desc: 'Jaribu mfumo unaofanya kazi moja kwa moja.' },
        { name: 'Usanifu na Teknolojia', desc: 'Chunguza mgawanyo wa ngazi na mtiririko wa data.' },
        { name: 'Usalama na Hatari', desc: 'Jifunze udhaifu wa OWASP na mifano ya kuzuia hatari.' },
        { name: 'Changamoto za Wanafunzi', desc: 'Tatua mazoezi ya kuandika msimbo kwa viwango tofauti.' },
        { name: 'Msimbo Chanzo', desc: 'Violezo safi vya TypeScript vilivyo tayari kutumika.' },
      ],
    },
    studentGuide: {
      title: '5. Mwongozo kwa Wanafunzi',
      desc: 'Ushauri wa kufanikisha mafunzo yako ya uhandisi wa programu.',
      tips: [
        'Linganisha tofauti kati ya kutoa maudhui tuli (SSG) na mifumo ya wakati halisi (CSR).',
        'Pitia sehemu ya usalama kabla ya kuandika miunganisho ya seva.',
        'Pima muonekano kwenye skrini ndogo ya simu (375px).',
      ],
    },
    faq: {
      title: '6. Maswali Yanayoulizwa Mara kwa Mara (FAQ)',
      items: [
        {
          q: 'Kuna tofauti gani kati ya Tovuti na Programu ya Wavuti?',
          a: 'Tovuti zinalenga kutoa maudhui haraka na SEO kupitia akiba ya CDN. Programu za wavuti zinalenga kubadilisha data, usalama wa watumiaji na shughuli za biashara.',
        },
      ],
    },
  },
};
