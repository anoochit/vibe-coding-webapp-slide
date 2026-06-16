// slides_data.js - เนื้อหาและข้อมูลสไลด์สำหรับการนำเสนอ Vibe Coding (ภาษาไทย)

const slidesData = [
  {
    layout: "title",
    transition: "fade",
    badge: "สไลด์",
    title: "การพัฒนาเว็บแอปพลิเคชันด้วย<br><span style='color: var(--google-blue);'>Vibe</span> <span style='color: var(--google-red);'>Co</span><span style='color: var(--google-yellow);'>di</span><span style='color: var(--google-green);'>ng</span>",
    subtitle: "การเปลี่ยนแปลงกระบวนทัศน์สมัยใหม่ในวิศวกรรมซอฟต์แวร์",
    presenter: "Anuchit Chalothorn"
  },
  {
    layout: "quote",
    transition: "slide",
    section: "ส่วนที่ 01",
    title: '"Vibe Coding" คืออะไร?',
    intro: "คำว่า <strong style='color: var(--google-blue);'>Vibe Coding</strong> ถูกบัญญัติขึ้นในช่วงต้นปี 2025 หมายถึง Workflow การทำงานที่ขับเคลื่อนด้วยการสนทนาและ Prompt ซึ่งมนุษย์ทำหน้าที่เป็นผู้สร้างสรรค์ระดับสูง และ AI ทำหน้าที่เขียนโค้ดทีละบรรทัด",
    quote: "ปล่อยใจไปตาม Vibes (ความรู้สึก), ยอมรับการเติบโตแบบทวีคูณ และลืมไปเลยว่าโค้ดนั้นมีตัวตนอยู่",
    author: "Andrej Karpathy, ผู้ร่วมก่อตั้ง OpenAI"
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 01",
    title: "การเปลี่ยนแนวคิด &bull; แบบดั้งเดิม vs Vibe",
    card1: {
      title: "การเขียนโค้ดแบบดั้งเดิม",
      badge: "Manual",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "<strong>การเขียน Syntax</strong>: พิมพ์การนำเข้าไฟล์, กฎไวยากรณ์ และโครงสร้างด้วยตนเอง",
        "<strong>การเสียเวลา</strong>: การไล่แก้ Compile Error และการเขียน Boilerplate",
        "<strong>จุดเน้น</strong>: ถูกจำกัดด้วยการจดจำ Syntax และข้อจำกัดของภาษา"
      ]
    },
    card2: {
      title: "Vibe Coding",
      badge: "Leveraged",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: [
        "<strong>บริบทและเจตจำนง</strong>: อธิบายคุณลักษณะด้วยภาษาธรรมชาติ",
        "<strong>การเสียเวลา</strong>: กำกับดูแลการอัปเดต, ทดสอบผลลัพธ์ และตรวจสอบโค้ด",
        "<strong>จุดเน้น</strong>: สถาปัตยกรรมแอป, การออกแบบ Interface และความเหมาะสมของผลิตภัณฑ์"
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 02",
    title: "หลักการพื้นฐานและ Workflow จริง",
    intro: "Vibe Coding ไม่ใช่แค่การสร้างงานแบบครั้งเดียว แต่มันคือลูปการทำงานระหว่างนักพัฒนากับ AI ที่มีความเป็นระบบและต่อเนื่อง:",
    card1: {
      title: "วงจรการ Vibe แบบวนซ้ำ",
      badge: "🔄 วงจร",
      themeColor: "var(--google-green)",
      badgeClass: "badge-green",
      items: [
        "<strong>ดูของ (See Stuff)</strong>: สร้าง รัน และตรวจสอบผลลัพธ์ในเบราว์เซอร์ด้วยตา",
        "<strong>พูดคุย (Say Stuff)</strong>: รายงานข้อผิดพลาดและสั่งเพิ่มฟีเจอร์ใหม่ทีละส่วน",
        "<strong>รันงาน (Run Stuff)</strong>: รันงานทันทีและตรวจสอบการรวมระบบที่ถูก Compile ใหม่"
      ]
    },
    card2: {
      title: "แนวคิดแบบ 'Tech Lead'",
      badge: "👑 บทบาท",
      themeColor: "#b06000",
      badgeClass: "badge-yellow",
      items: [
        "มนุษย์รับบทเป็น <strong>Tech Lead</strong> กำหนดเจตจำนงและตรวจสอบ Diff ของโค้ด",
        "AI รับบทเป็น <strong>Junior Developer</strong> ที่ทำงานไม่มีเหนื่อยในการเขียนโค้ด",
        "<strong>รสนิยมการออกแบบ</strong> ของคุณคือตัวกำหนดความยอดเยี่ยมของโปรเจกต์"
      ]
    }
  },
  {
    layout: "table",
    transition: "slide",
    section: "ส่วนที่ 03",
    title: "ระบบนิเวศเครื่องมือ Vibe Coding",
    headers: ["เครื่องมือ", "ขอบเขตงาน", "จุดแข็งหลักในการนำเสนอ"],
    rows: [
      ["<strong>Cursor</strong>", "AI-first Code Editor", "การทำ Index โค้ดเบส, แชทที่เข้าใจบริบท และการแก้ไขหลายไฟล์พร้อมกัน"],
      ["<strong>Replit Agent</strong>", "การสร้างต้นแบบอย่างรวดเร็ว", "สร้างแอปจากไอเดีย พร้อมเชื่อมฐานข้อมูลและ Deploy ทันที"],
      ["<strong>GitHub Copilot</strong>", "Agent ตาม Task", "แปลง Issue เป็นแผนการรัน PR ที่สมบูรณ์โดยตรง"],
      ["<strong>Google Gemini</strong>", "การสร้างสรรค์ไอเดีย", "Context Window ขนาดใหญ่ที่เหมาะสำหรับการซึมซับสถาปัตยกรรมทั้งหมด"]
    ]
  },
  {
    layout: "grid-2-columns",
    transition: "slide",
    section: "ส่วนที่ 04",
    title: "ข้อดีหลักของแนวทาง Vibe",
    column1: [
      "<strong>ความเร็วในการสร้างต้นแบบสูงสุด</strong><br>สร้าง User Interface ที่รองรับทุกอุปกรณ์, เว็บแอปพลิเคชันที่ทำงานได้สมบูรณ์ และการเชื่อมต่อฐานข้อมูลได้ในเวลาไม่กี่ชั่วโมง",
      "<strong>การทำให้การสร้างแอปเข้าถึงได้ทุกคน</strong><br>ช่วยให้ Product Manager, Designer และผู้เชี่ยวชาญสามารถทดสอบคอนเซปต์ได้โดยไม่มีกำแพงด้าน Syntax"
    ],
    column2: [
      "<strong>ลดภาระทางสมอง</strong><br>ปลดปล่อยความคิดจากงานเขียน Boilerplate ซ้ำซาก, การตั้งค่า Config และการเชื่อมต่อ API ด้วยมือ",
      "<strong>เน้นที่การคัดสรรและรสนิยม</strong><br>ใช้พลังงานไปกับความสวยงาม, Micro-interactions, การปรับขนาดที่รองรับทุกอุปกรณ์ และเส้นทางลูกค้าที่สวยงาม"
    ]
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 04",
    title: "ความเสี่ยงและความท้าทาย",
    intro: "การกำกับ AI ต้องมีการตรวจสอบระดับสูง หากไม่ตรวจสอบ Prompt อาจนำไปสู่ปัญหาร้ายแรงในระบบจริง:",
    card1: {
      title: "หนี้ทางเทคนิคและคุณภาพ",
      badge: "📉 โค้ด",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "AI สามารถสร้าง 'Black Box' ที่เต็มไปด้วยบล็อกโค้ดที่ซ้ำซ้อน",
        "โครงสร้างโค้ดที่ไม่มีประสิทธิภาพสามารถทำให้หน้าเว็บโหลดช้าลง"
      ]
    },
    card2: {
      title: "ความปลอดภัยและทักษะ",
      badge: "🔒 ความเสี่ยง",
      themeColor: "#b06000",
      badgeClass: "badge-yellow",
      items: [
        "AI อาจพลาดการตรวจสอบ Validation ทำให้เกิดช่องโหว่ในการเข้าถึงข้อมูล",
        "การพึ่งพามากเกินไปอาจทำให้ตรรกะพื้นฐานและทักษะภาษาของนักพัฒนาอ่อนแอลง"
      ]
    }
  },
  {
    layout: "table",
    transition: "slide",
    section: "ส่วนที่ 06",
    title: "Vibe Coding vs. Low-Code / No-Code",
    headers: ["คุณสมบัติ", "Vibe Coding", "Low-Code / No-Code"],
    rows: [
      ["<strong>Interface</strong>", "ภาษาธรรมชาติ (Chat/Prompts)", "การมองเห็น (Drag-and-drop, เมนู)"],
      ["<strong>ผลลัพธ์</strong>", "<strong>ซอร์สโค้ดจริง</strong> (React ฯลฯ)", "Metadata เฉพาะตัว (ถูกล็อกระบบ)"],
      ["<strong>ความยืดหยุ่น</strong>", "<strong>ไร้ขีดจำกัด</strong> ทำได้ทุกอย่างที่โค้ดทำได้", "จำกัดเฉพาะ Component ที่เตรียมไว้"],
      ["<strong>การผูกขาด</strong>", "<strong>ต่ำ</strong> เป็นเจ้าของและโฮสต์ได้ทุกที่", "<strong>สูง</strong> การย้ายออกต้องเริ่มสร้างใหม่ทั้งหมด"]
    ]
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 05",
    title: "แนวทางปฏิบัติที่ดีที่สุด &bull; บริบทและการตรวจสอบ",
    intro: "เพื่อให้ได้ซอฟต์แวร์ระดับมืออาชีพด้วยวิธี 'Vibe' วิศวกรควรใช้มาตรการป้องกันที่เคร่งครัด:",
    card1: {
      title: "1. การจัดการบริบท (Context)",
      badge: "🔍 ขอบเขต",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: [
        "ระบุ Schema ฐานข้อมูลและไฟล์ที่แน่นอนเพื่อให้ AI มีข้อมูลพื้นฐาน",
        "แบ่งฟีเจอร์ออกเป็น Micro-milestones ที่ทดสอบได้ง่าย"
      ]
    },
    card2: {
      title: "2. การตรวจสอบโค้ด",
      badge: "🧪 คุณภาพ",
      themeColor: "var(--google-green)",
      badgeClass: "badge-green",
      items: [
        "ตรวจสอบ Diff ของโค้ดเบสอย่างระมัดระวังก่อนยอมรับการ Merge",
        "เขียน Automated Unit Test และ Functional Test ตั้งแต่เนิ่นๆ"
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 05",
    title: "แนวทางปฏิบัติที่ดีที่สุด &bull; ความปลอดภัยและรสนิยม",
    intro: "กฎเกณฑ์เชิงสถาปัตยกรรมระดับการผลิตต่อเนื่อง:",
    card1: {
      title: "3. ความปลอดภัยของความลับและตัวแปร",
      badge: "🔑 กฎ",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "ห้ามใส่ API Key หรือ Private Token ลงใน Prompt ข้อความ",
        "บังคับใช้การตั้งค่าในไฟล์ `.env` ที่ปลอดภัยและตั้งค่า ignore ไว้"
      ]
    },
    card2: {
      title: "4. การคัดสรรและรสนิยมผลิตภัณฑ์",
      badge: "🎨 ภาพลักษณ์",
      themeColor: "var(--google-yellow)",
      badgeClass: "badge-yellow",
      items: [
        "ควบคุม Typography, การเว้นวรรค และขอบเขต Grid อย่างละเอียด",
        "ใส่ใจเรื่อง Layout ที่รองรับทุกอุปกรณ์และ Micro-animations ที่สัมผัสได้"
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 10",
    title: "Spec-Driven Development (SDD)",
    intro: "เมื่อโปรเจกต์ขยายใหญ่ขึ้น การ Prompt แบบหลวมๆ จะชน 'กำแพงสามเดือน' SDD จึงวิวัฒนาการ Vibe ให้เป็นวินัยทางสถาปัตยกรรม:",
    card1: {
      title: "ปรัชญาหลัก",
      badge: "🛡️ ความเชื่อถือได้",
      themeColor: "var(--google-blue)",
      badgeClass: "badge-blue",
      items: [
        "AI ในฐานะคู่หูเขียนโปรแกรมที่ <strong>ทำตามตัวอักษร</strong>",
        "กำหนดขอบเขตและเจตจำนงที่ชัดเจนและเป็นทางการ",
        "จุดเน้นเปลี่ยนจากการ 'Vibing' ไปสู่ <strong>การจัดการเจตจำนง</strong>"
      ]
    },
    card2: {
      title: "ระดับความพร้อม 3 ระดับ",
      badge: "📈 การขยายขนาด",
      themeColor: "var(--google-yellow)",
      badgeClass: "badge-yellow",
      items: [
        "<strong>ระดับ 1: Spec-First</strong>: ใช้ Spec สำหรับฟีเจอร์ที่ซับซ้อน",
        "<strong>ระดับ 2: Spec-Anchored</strong>: มี Spec ที่คุมเวอร์ชันอยู่เสมอ",
        "<strong>ระดับ 3: Spec-as-Source</strong>: คนแก้ Spec, AI Compile เป็นโค้ด"
      ]
    }
  },
  {
    layout: "grid-2-cards",
    transition: "slide",
    section: "ส่วนที่ 10",
    title: "วงจรชีวิต SDD &bull; 4 เสาหลัก",
    card1: {
      title: "1. Specify & 2. Plan",
      badge: "📝 เจตจำนง",
      themeColor: "var(--google-red)",
      badgeClass: "badge-red",
      items: [
        "<strong>Specify</strong>: อธิบาย 'อะไร' และ 'ทำไม' ด้วยภาษาธรรมชาติ",
        "<strong>Plan</strong>: กำหนดข้อจำกัดทางเทคนิคและสถาปัตยกรรมว่า 'อย่างไร'"
      ]
    },
    card2: {
      title: "3. Taskify & 4. Implement",
      badge: "⚡ การลงมือทำ",
      themeColor: "var(--google-green)",
      badgeClass: "badge-green",
      items: [
        "<strong>Taskify</strong>: แบ่งแผนงานออกเป็นหน่วยย่อยๆ ที่รีวิวได้ง่าย",
        "<strong>Implement</strong>: AI ทำงานตาม Task พร้อมโค้ดและ Test ที่ตรวจสอบแล้ว"
      ]
    }
  },
  {
    layout: "table",
    transition: "slide",
    section: "ส่วนที่ 11",
    title: "Stack นักพัฒนารูปแบบ AI-Native (2026)",
    headers: ["ชั้น (Layer)", "ส่วนประกอบ", "มาตรฐานปี 2026"],
    rows: [
      ["<strong>Orchestration</strong>", "มันสมอง", "เครื่องมือที่เข้าใจบริบท จัดการสถานะข้ามไฟล์"],
      ["<strong>Execution</strong>", "มือ", "Sub-Agents เฉพาะทางสำหรับงานย่อยๆ"],
      ["<strong>Persistence</strong>", "ความจำ", "เอกสารที่ยึดตามบริบท ทำหน้าที่เป็นความจำระยะยาว"],
      ["<strong>Verification</strong>", "ผู้ตรวจสอบ", "ระบบ 'Slop Detector' อัตโนมัติที่รันทุกครั้งที่สร้างงาน"]
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "ส่วนที่ 12",
    title: "จาก 'การแชท' สู่ 'การจัดแจง (Orchestration)'",
    intro: "การวางโค้ดลงแชทจบลงแล้ว Workflow ในปี 2026 พึ่งพา Context-Aware Orchestration:",
    items: [
      "<strong>การพัฒนาแบบ Context-First</strong>: เครื่องมือทำ Index ข้อมูลสภาพแวดล้อม เอกสาร และคีย์ต่างๆ อย่างปลอดภัย",
      "<strong>Agent-in-the-Loop</strong>: การมอบหมายงานให้ Sub-Agents (เช่น `firebase-expert`) แทนการ Prompt ดิบๆ",
      "<strong>Zero-Shot Scaffolding</strong>: การตั้งค่า Cloud Backend และ CI/CD Pipeline อัตโนมัติในไม่กี่วินาที"
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "ข้อกำหนดของ VibeTree (แกนหลัก)",
    intro: "VibeTree คือตัวโคลน Linktree ที่สวยงาม แสดงให้เห็นถึงการผสานรวม Firebase ระดับการผลิต:",
    items: [
      "<strong>F-01 แผง Builder แบบแยกส่วน</strong>: Dashboard ควบคุมฝั่งซ้าย พร้อม Preview มือถือแบบลอยตัวฝั่งขวาที่อัปเดตเรียลไทม์",
      "<strong>F-02 การจัดการลิงก์แบบไดนามิก</strong>: เพิ่ม แก้ไข และลบลิงก์ พร้อมระบุ Domain อัตโนมัติเพื่อแสดงไอคอนแบรนด์โซเชียล",
      "<strong>F-03 Firebase Authentication</strong>: ระบบ Login หลายผู้เช่า (Email & Google) รองรับ Path `/dashboard` และโปรไฟล์สาธารณะ",
      "<strong>F-04 การซิงค์ฐานข้อมูลและการเช็คตั้งค่า</strong>: ซิงค์ข้อมูลโปรไฟล์กับ Firestore พร้อมไกด์การตั้งค่าที่สวยงามหากขาดตัวแปรสภาพแวดล้อม"
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "ข้อกำหนดของ VibeTree (ขั้นสูง)",
    intro: "ฟีเจอร์ขั้นสูงที่เน้นประสิทธิภาพ ความลึกของภาพ และการติดตามวิเคราะห์:",
    items: [
      "<strong>F-05 การอัปโหลด Firebase Storage</strong>: จัดการการอัปโหลดรูป Avatar ที่ปลอดภัยและปรับขนาดให้เหมาะสม",
      "<strong>F-06 การจัดลำดับแบบ Drag-and-Drop</strong>: ระบบจัดลำดับลิงก์แบบลากวางที่เบาหวิวและบันทึกค่าลง Firestore ทันที",
      "<strong>F-07 ธีมพรีเมียมแบบกำหนดเอง</strong>: รองรับ Dark Glassmorphism, Cyberpunk Neon, Minimalist Pastel และ Retro Brutalism",
      "<strong>F-08 Dashboard วิเคราะห์ไดนามิก</strong>: บันทึกเหตุการณ์คลิกลิงก์และแสดงเส้นเวลาการคลิกด้วย Chart.js",
      "<strong>F-09 Firebase App Hosting</strong>: การตั้งค่า CI/CD ที่พร้อมใช้งานสำหรับการโฮสต์ Next.js ผ่าน App Hosting Pipeline"
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "โครงสร้างฐานข้อมูลและความปลอดภัย VibeTree",
    intro: "บังคับใช้โครงสร้างข้อมูลที่เข้มงวดและการตั้งค่าที่ปลอดภัยเพื่อความสบายใจ:",
    items: [
      "<strong>Collection users</strong>: เก็บข้อมูลผู้ใช้, อ้างอิง Avatar, ธีมที่เลือก และอาร์เรย์ของลิงก์พร้อมสถิติการคลิก",
      "<strong>Collection usernames</strong>: สารบัญสำหรับการค้นหาย้อนกลับที่ปรับจูนเพื่อประสิทธิภาพ เพื่อให้แน่ใจว่าชื่อผู้ใช้ไม่ซ้ำกัน",
      "<strong>Subcollection analytics</strong>: เก็บข้อมูลสถิติรายวันแบบ Time-series สำหรับ Component ของ Chart.js",
      "<strong>Firebase Security Rules</strong>: ระบบควบคุมการเข้าถึงระดับการผลิต ตรวจสอบ Token ของผู้ใช้สำหรับการเขียนฐานข้อมูล"
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "การทำ SEO และการปรับรูปภาพ VibeTree",
    intro: "เพื่อให้แน่ใจว่าจะถูกค้นพบได้ง่าย รวดเร็ว และจัดการทรัพยากรตามมาตรฐาน:",
    items: [
      "<strong>Dynamic SEO & OG Meta Tags</strong>: เส้นทางสาธารณะสร้าง Metadata ฝั่ง Server เพื่อแสดง Preview โปรไฟล์ใน Slack, X และ Discord",
      "<strong>ข้อจำกัดการอัปโหลด Avatar</strong>: บังคับใช้ขนาดไฟล์สูงสุด 2MB ในระดับ Rule และตรวจสอบประเภทไฟล์ฝั่ง Client",
      "<strong>Component Image ของ Next.js</strong>: ใช้การปรับแต่งภาพแบบ Native พร้อมแปลงเป็น WebP อัตโนมัติและป้องกันการขยับของ Layout (CLS)"
    ]
  },
  {
    layout: "list",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "การตรวจสอบลิงก์และระบบป้องกัน UX",
    intro: "รับประกันความเสถียรสูงสุด การป้องกันข้อผิดพลาด และการโต้ตอบที่พรีเมียม:",
    items: [
      "<strong>ข้อจำกัด Regex ของ Username</strong>: ตรวจสอบชื่อผู้ใช้เรียลไทม์เพื่อบล็อกการลงทะเบียนที่ไม่ถูกต้องตั้งแต่ต้น",
      "<strong>การตรวจสอบ URL ด้วย Regex</strong>: ตรวจสอบค่าลิงก์อัตโนมัติ และช่วยเติม `https://` ให้อัตโนมัติหากขาดไป",
      "<strong>ผลตอบรับทางภาพที่สัมผัสได้</strong>: ปิดปุ่มบันทึกระหว่างการซิงค์ Firestore หรือการอัปโหลด Storage พร้อมแสดง Spinner ที่สวยงาม",
      "<strong>ข้อจำกัดความยาวข้อความ</strong>: จำกัดความยาวคำอธิบายโปรไฟล์ที่ 160 ตัวอักษร และหัวข้อลิงก์ที่ 50 ตัวอักษร"
    ]
  },
  {
    layout: "table",
    transition: "slide",
    section: "กรณีศึกษา: VibeTree PRD",
    title: "ธีมภาพระดับพรีเมียมของ VibeTree",
    headers: ["ชื่อธีม", "ลักษณะความสวยงาม", "Token ภาษาการออกแบบ"],
    rows: [
      ["<strong>🌌 Dark Glassmorphism</strong>", "macOS สมัยใหม่แบบกระจกฝ้า", "Gradient สี Obsidian, การ์ดโปร่งแสง, แสงเรือง Cyan/Violet, backdrop filter blur"],
      ["<strong>⚡ Cyberpunk / Neon</strong>", "Terminal แห่งอนาคตย้อนยุค", "สีดำสนิท, ขอบสีชมพู/ฟ้าเรืองแสง, ฟอนต์ JetBrains Mono, แสงเรืองแบบ 3D"],
      ["<strong>🌸 Minimalist Pastel</strong>", "แบรนด์ไลฟ์สไตล์ที่เรียบง่าย", "สีครีมอบอุ่น, การ์ดสีขาวด้าน, ขอบสีเขียวอ่อน, หัวข้อฟอนต์ Serif"],
      ["<strong>🧱 Retro Brutalism</strong>", "Layout แบบดิบๆ สนุกสนาน", "สีเหลืองกล้วย, ขอบสีดำหนา 4px, เงาแบบแข็ง, ฟอนต์หัวข้อแบบ Blocky"]
    ]
  },
  {
    layout: "conclusion",
    transition: "fade",
    badge: "มุมมองสู่อนาคต",
    title: "นักพัฒนาแห่งอนาคต <br>คือ <span style='color: var(--google-green);'>ผู้อำนวยการคัดสรร (Curation Director)</span>",
    subtitle: "มาสร้างแอปพลิเคชันที่สวยงามและสง่างามไปด้วยกัน",
    thankYou: "ขอบคุณ!"
  }
];

// ส่งออกข้อมูลไปยัง window object สำหรับการนำเข้าผ่านเบราว์เซอร์
window.slidesData = slidesData;
