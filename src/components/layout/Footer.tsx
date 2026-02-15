import React from 'react';

const Footer = () => (
    <footer className="py-12 border-t border-white/5 text-center bg-[#050505] mt-auto">
        <div className="font-signature text-3xl text-zinc-600 mb-6">Dee.</div>
        <div className="flex justify-center gap-8 text-sm text-zinc-500 mb-8 font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p className="text-xs text-zinc-700">© 2024 Dee. All rights reserved.</p>
    </footer>
);
export default Footer;