'use client';

import { useMemo, useState } from 'react';

type Step = 'overview' | 'jd' | 'evidence' | 'decision' | 'interview' | 'review';

const navItems: { id: Step; label: string; icon: string; count?: string }[] = [
  { id: 'overview', label: '总览', icon: '⌂' },
  { id: 'jd', label: '岗位拆解', icon: '▤', count: '6' },
  { id: 'evidence', label: '经历证据库', icon: '◈', count: '5' },
  { id: 'decision', label: '投递建议', icon: '↗' },
  { id: 'interview', label: '面试评分表', icon: '✦' },
  { id: 'review', label: '面试复盘', icon: '↻' },
];

const requirements = [
  { title: '用户研究与问题定义', source: '能够通过用户访谈、数据分析识别真实需求', level: '必备', status: 'strong', evidence: '猎头实习｜访谈候选人并整理岗位画像', score: 88 },
  { title: 'AI 产品理解', source: '理解大模型能力边界，并能设计合理的 AI 体验', level: '必备', status: 'partial', evidence: '校园项目｜设计 AI 求职工具原型', score: 64 },
  { title: '产品方案与流程设计', source: '独立完成产品方案、流程和原型设计', level: '必备', status: 'strong', evidence: '校园项目｜从访谈到原型迭代', score: 82 },
  { title: '数据与实验意识', source: '通过指标和实验持续验证产品效果', level: '必备', status: 'gap', evidence: '当前经历库没有足够证据', score: 32 },
  { title: '跨团队协作', source: '推动设计、研发和业务团队共同交付', level: '重要', status: 'partial', evidence: '猎头实习｜协调候选人与招聘方', score: 56 },
  { title: '具身智能领域经验', source: '有机器人、具身智能或相关技术产品经验优先', level: '加分', status: 'gap', evidence: '当前经历库没有相关项目', score: 18 },
];

const evidence = [
  { tag: '实习经历', title: '访谈候选人并整理岗位画像', detail: '在猎头实习中与 20+ 位候选人沟通，记录求职动机、技能和岗位偏好，协助整理岗位画像。', proof: '可证明：用户沟通、需求理解、信息归纳', strength: '已验证', color: 'green' },
  { tag: '校园项目', title: '设计 AI 求职工具原型', detail: '基于 5 次用户访谈，定义求职信息整理痛点，完成一套 AI 求职工具的流程和交互原型。', proof: '可证明：问题定义、产品流程、AI 场景设计', strength: '部分验证', color: 'amber' },
  { tag: '课程项目', title: '分析用户反馈并迭代产品流程', detail: '整理问卷和访谈反馈，提出 onboarding 流程调整建议，但没有记录明确的实验指标。', proof: '可证明：反馈分析、流程迭代', strength: '待补充', color: 'blue' },
  { tag: '个人探索', title: '持续关注 VLA 与机器人产品', detail: '阅读论文和产品资料，建立具身智能产品观察笔记。', proof: '可证明：领域兴趣；不可直接证明：项目交付经验', strength: '不可声称', color: 'red' },
];

const actions = [
  { kind: '改简历', title: '补上 AI 求职项目的验证过程', body: '把“设计了 AI 工具”改成：说明访谈对象、发现的具体问题、做过的取舍，以及原型如何被验证。', tone: 'coral' },
  { kind: '补项目', title: '做一个可量化的产品实验', body: '为现有原型增加一个小实验：比较有无证据提示时，用户完成岗位判断的时间和信心变化。', tone: 'lavender' },
  { kind: '调策略', title: '优先申请 AI 产品实习岗位', body: '当前用户研究和问题定义证据较强，具身智能岗位可以先作为补充目标，不要把“关注领域”写成项目经验。', tone: 'mint' },
];

function StatusPill({ status }: { status: string }) {
  const labels: Record<string, string> = { strong: '已有证据', partial: '部分证据', gap: '证据缺口' };
  return <span className={`status-pill ${status}`}>{labels[status]}</span>;
}

export default function Home() {
  const [active, setActive] = useState<Step>('overview');
  const [feedback, setFeedback] = useState('面试官追问了项目结果，但我只能描述过程，没有准备具体指标。');
  const [copied, setCopied] = useState(false);
  const activeLabel = useMemo(() => navItems.find((item) => item.id === active)?.label ?? '总览', [active]);

  function copyMaterial() {
    navigator.clipboard?.writeText('我擅长从真实用户反馈中定义问题，并将复杂的 AI 能力转化为清晰、可验证的产品体验。过去的猎头实习和 AI 求职工具项目，让我积累了用户访谈、需求分析和产品流程设计经验。');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-mark">O</div><div><strong>OfferLoop</strong><span>Evidence-first career copilot</span></div></div>
        <div className="profile-card"><div className="avatar">林</div><div><strong>林然</strong><span>AI 产品经理候选人</span></div><button className="more-button" aria-label="更多设置">•••</button></div>
        <nav className="side-nav" aria-label="主导航"><p className="nav-heading">工作台</p>{navItems.map((item) => <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.count && <em>{item.count}</em>}</button>)}<p className="nav-heading lower">我的材料</p><button className="nav-item" onClick={() => setActive('evidence')}><span className="nav-icon">▧</span><span>申请材料包</span></button></nav>
        <div className="privacy-note"><span>⌁</span><div><strong>隐私优先</strong><p>当前使用匿名模拟数据<br />不会上传真实个人资料</p></div></div>
        <div className="sidebar-footer"><span className="status-dot" /> Demo workspace <span>v0.1</span></div>
      </aside>
      <section className="content-area">
        <header className="topbar"><div className="breadcrumb"><span>工作台</span><b>/</b><strong>{activeLabel}</strong></div><div className="top-actions"><button className="icon-button" aria-label="帮助">?</button><button className="text-button">导入经历</button><button className="primary-button small" onClick={() => setActive('jd')}>+ 分析新岗位</button></div></header>
        {active === 'overview' && <Overview onNavigate={setActive} />}
        {active === 'jd' && <JDPanel />}
        {active === 'evidence' && <EvidencePanel />}
        {active === 'decision' && <DecisionPanel onNavigate={setActive} />}
        {active === 'interview' && <InterviewPanel />}
        {active === 'review' && <ReviewPanel feedback={feedback} setFeedback={setFeedback} onCopy={copyMaterial} copied={copied} />}
      </section>
    </main>
  );
}

function PageIntro({ eyebrow, title, desc, action }: { eyebrow: string; title: string; desc: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{desc}</p></div>{action}</div>;
}

function Overview({ onNavigate }: { onNavigate: (step: Step) => void }) {
  return <div className="page-wrap"><PageIntro eyebrow="Tuesday, 25 August 2026" title="准备好判断下一个机会了吗？" desc="OfferLoop 帮你把真实经历和岗位要求放在一起，再决定是否值得投入时间。" action={<button className="primary-button" onClick={() => onNavigate('jd')}>继续上次分析 <span>→</span></button>} /><div className="hero-card"><div className="hero-content"><span className="mini-label">正在分析的岗位</span><h2>AI 产品经理实习生</h2><p>智行机器人 · 上海 / 混合办公</p><div className="hero-meta"><span>6 项能力要求</span><span>5 条经历证据</span><span>更新于今天</span></div></div><div className="ring-score"><div><strong>68</strong><span>/ 100</span></div><small>证据覆盖度</small></div></div><div className="section-heading"><div><p className="eyebrow">岗位分析进度</p><h2>这次申请，走到哪一步了？</h2></div><button className="ghost-button" onClick={() => onNavigate('decision')}>查看完整分析 →</button></div><div className="progress-grid"><ProgressCard icon="▤" title="岗位拆解" detail="6 项能力要求已识别" value="100%" done onClick={() => onNavigate('jd')} /><ProgressCard icon="◈" title="证据匹配" detail="4 项有证据 · 2 项待补充" value="68%" onClick={() => onNavigate('evidence')} /><ProgressCard icon="✦" title="面试准备" detail="评分表已生成" value="下一步" onClick={() => onNavigate('interview')} /></div><div className="bottom-grid"><div className="card activity-card"><div className="card-title"><h3>最近一次判断</h3><span className="date">刚刚</span></div><div className="decision-row"><div className="decision-badge">补充后投</div><div><strong>AI 产品经理实习生</strong><p>用户研究证据较强，但数据实验和具身智能经验需要补充。</p></div><button className="arrow-button" onClick={() => onNavigate('decision')}>→</button></div></div><div className="card quote-card"><span className="quote-mark">“</span><p>能证明什么，比看起来像什么更重要。</p><small>OfferLoop 的判断原则</small></div></div></div>;
}

function ProgressCard({ icon, title, detail, value, done, onClick }: { icon: string; title: string; detail: string; value: string; done?: boolean; onClick: () => void }) {
  return <button className="progress-card" onClick={onClick}><div className="progress-icon">{icon}</div><div className="progress-text"><strong>{title}</strong><span>{detail}</span></div><div className={`progress-value ${done ? 'done' : ''}`}>{done ? '✓' : value}</div></button>;
}

function JDPanel() {
  return <div className="page-wrap"><PageIntro eyebrow="01 / 岗位拆解" title="AI 产品经理实习生" desc="先理解岗位真正需要什么，再去看自己的经历是否能证明。" action={<button className="outline-button">编辑 JD</button>} /><div className="job-banner"><div className="company-logo">Z</div><div><strong>智行机器人</strong><span>AI 产品经理实习生 · 上海 / 混合办公</span></div><span className="job-tag">正在分析</span></div><div className="section-heading compact"><div><p className="eyebrow">岗位能力地图</p><h2>招聘方真正想确认的 6 件事</h2></div><span className="muted-label">依据 JD 原文拆解</span></div><div className="requirement-list">{requirements.map((item, index) => <div className="requirement-row" key={item.title}><div className="number">0{index + 1}</div><div className="requirement-main"><div className="requirement-title"><strong>{item.title}</strong><span className={`level ${item.level === '加分' ? 'bonus' : ''}`}>{item.level}</span></div><p>{item.source}</p><div className="linked-evidence"><StatusPill status={item.status} /><span>{item.evidence}</span></div></div><div className="score-column"><strong>{item.score}</strong><span>证据覆盖</span></div><span className="row-arrow">→</span></div>)}</div></div>;
}

function EvidencePanel() {
  return <div className="page-wrap"><PageIntro eyebrow="02 / 经历证据库" title="你的经历，能证明什么？" desc="每条建议都必须能回到一条真实经历。没有证据的地方，我们会明确标出来。" action={<button className="primary-button">+ 添加经历</button>} /><div className="evidence-summary"><div><span className="summary-number">5</span><span>条经历</span></div><div><span className="summary-number green-text">3</span><span>已建立关联</span></div><div><span className="summary-number amber-text">2</span><span>需要补充</span></div><div className="summary-tip">⌁ 证据库只保存你确认过的事实，不自动扩写经历。</div></div><div className="evidence-grid">{evidence.map((item) => <div className="evidence-card" key={item.title}><div className="evidence-top"><span className="evidence-tag">{item.tag}</span><span className={`evidence-strength ${item.color}`}>{item.strength}</span></div><h3>{item.title}</h3><p>{item.detail}</p><div className="proof-line"><span>✓</span>{item.proof}</div><button className="edit-link">查看关联要求 →</button></div>)}</div></div>;
}

function DecisionPanel({ onNavigate }: { onNavigate: (step: Step) => void }) {
  return <div className="page-wrap"><PageIntro eyebrow="03 / 投递建议" title="值得现在投入时间吗？" desc="这个判断综合考虑岗位要求、已有证据和缺口的可补充程度，不用一个分数替代决定。" /><div className="decision-header"><div className="recommendation"><span className="recommendation-icon">↗</span><div><span>当前建议</span><h2>补充后投</h2><p>值得准备，但建议先补齐 2 项关键证据。</p></div></div><div className="decision-stats"><div><strong>4 / 6</strong><span>核心要求有证据</span></div><div><strong>2 项</strong><span>短期可补缺口</span></div></div></div><div className="decision-columns"><div className="card"><div className="card-title"><h3>为什么是这个判断？</h3><span className="muted-label">可解释</span></div><div className="reason-item positive"><span>✓</span><div><strong>用户研究与问题定义</strong><p>猎头实习和 AI 工具项目提供了较直接的证据。</p></div></div><div className="reason-item positive"><span>✓</span><div><strong>产品方案与流程设计</strong><p>已有从访谈到原型的完整过程。</p></div></div><div className="reason-item warning"><span>!</span><div><strong>数据与实验意识</strong><p>经历中提到迭代，但没有具体指标或实验结果。</p></div></div><div className="reason-item warning"><span>!</span><div><strong>具身智能领域经验</strong><p>目前只有阅读和关注，不能写成项目交付经验。</p></div></div></div><div className="card next-step-card"><div className="card-title"><h3>投递前先做这两件事</h3></div><div className="check-step"><span>1</span><p>给 AI 求职工具原型补一条用户验证结果</p><button onClick={() => onNavigate('review')}>去补充 →</button></div><div className="check-step"><span>2</span><p>准备一个关于数据实验的诚实回答</p><button onClick={() => onNavigate('interview')}>去准备 →</button></div><div className="do-not"><strong>不要这样写</strong><p>“熟悉机器人产品和数据驱动增长。” 当前经历库没有足够证据支持这句话。</p></div></div></div></div>;
}

function InterviewPanel() {
  return <div className="page-wrap"><PageIntro eyebrow="04 / 面试评分表" title="把岗位要求变成准备清单" desc="面试不是猜题。每个问题都应该对应一项能力，以及你准备使用的真实证据。" action={<button className="primary-button" onClick={() => window.alert('评分已保存到本地 Demo')}>保存自评</button>} /><div className="interview-meta"><div><span>岗位</span><strong>AI 产品经理实习生</strong></div><div><span>面试轮次</span><strong>一面 · 产品面</strong></div><div><span>准备状态</span><strong className="amber-text">3 / 6 项</strong></div></div><div className="scorecard-list">{requirements.slice(0, 5).map((item, index) => <div className="scorecard-row" key={item.title}><div className="scorecard-index">0{index + 1}</div><div className="scorecard-copy"><strong>{item.title}</strong><p>{index === 0 ? '能否从真实用户行为出发，而不是只复述需求。' : index === 1 ? '能否解释为什么这个场景适合使用 AI，以及边界在哪里。' : index === 2 ? '能否讲清楚从问题到方案的取舍过程。' : index === 3 ? '能否用指标或实验说明方案是否有效。' : '能否推动不同角色一起解决阻塞。'}</p><span className="question-chip">可能会问：{index === 0 ? '你如何发现这个问题？' : index === 1 ? '为什么这里需要 AI？' : index === 2 ? '你做过哪些产品取舍？' : index === 3 ? '你如何判断产品有效？' : '遇到分歧时怎么办？'}</span></div><div className="self-score"><span>自评</span><div><button>1</button><button>2</button><button className="selected">3</button><button>4</button><button>5</button></div></div></div>)}</div></div>;
}

function ReviewPanel({ feedback, setFeedback, onCopy, copied }: { feedback: string; setFeedback: (value: string) => void; onCopy: () => void; copied: boolean }) {
  return <div className="page-wrap"><PageIntro eyebrow="05 / 面试复盘" title="这次反馈，下一步怎么用？" desc="把“感觉没答好”拆成可以改变的行动，而不是停留在情绪里。" action={<span className="review-status">● 已保存为草稿</span>} /><div className="review-layout"><div className="review-input card"><div className="card-title"><h3>录入面试反馈</h3><span className="muted-label">AI 产品经理一面</span></div><label>面试官主要追问了什么？<textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} /></label><label>你自己的感受<textarea placeholder="例如：回答过程比较顺，但对结果和指标准备不足。" defaultValue="回答过程比较顺，但对结果和指标准备不足。" /></label><button className="primary-button full" onClick={() => window.alert('复盘分析已更新')}>重新分析反馈 <span>→</span></button></div><div className="review-result"><div className="insight-banner"><span className="insight-icon">✦</span><div><span>OfferLoop 识别到的主要问题</span><h3>这是证据不足，不只是表达问题。</h3><p>你能描述做了什么，但还不能说明做完后发生了什么。</p></div></div><div className="card diagnosis-card"><div className="card-title"><h3>反馈拆解</h3><span className="muted-label">基于你的输入</span></div><div className="diagnosis-item"><span className="diagnosis-icon coral">!</span><div><strong>结果证据缺口</strong><p>项目经历缺少用户反馈、实验结果或可观察的行为变化。</p></div><span className="diagnosis-level">高优先级</span></div><div className="diagnosis-item"><span className="diagnosis-icon mint">✓</span><div><strong>问题定义已有基础</strong><p>你的访谈过程可以支撑“如何发现问题”的回答。</p></div><span className="diagnosis-level low">保持</span></div></div></div></div><div className="section-heading compact action-heading"><div><p className="eyebrow">下一步行动</p><h2>把这次面试变成下一次的准备材料</h2></div></div><div className="action-grid">{actions.map((action) => <div className={`action-card ${action.tone}`} key={action.kind}><span className="action-kind">{action.kind}</span><h3>{action.title}</h3><p>{action.body}</p><button onClick={action.kind === '改简历' ? onCopy : undefined}>{action.kind === '改简历' ? (copied ? '已复制 ✓' : '复制建议') : '查看建议 →'}</button></div>)}</div></div>;
}
