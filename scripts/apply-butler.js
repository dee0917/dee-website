const fs = require('fs');
const path = '/root/.openclaw/workspace/src/data/news/tutorial-airi-minecraft-parent.ts';
let content = fs.readFileSync(path, 'utf8');
if (!content.includes('VERIFIED_BY_BUTLER')) {
    content = content.replace(
        '<span class="px-5 py-1.5 rounded-full bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.4em]">Master the Deploy</span>',
        '<span class="px-5 py-1.5 rounded-full bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.4em]">Master the Deploy</span>\n                        <span class="text-zinc-600 font-mono text-[10px] font-bold">VERIFIED_BY_BUTLER // STEEL_AUDIT_PASSED</span>'
    );
    fs.writeFileSync(path, content);
}
