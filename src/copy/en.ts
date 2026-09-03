import type { ArticlePageCopy, HomeCopy, SiteCopy, TypePageCopy } from './types';

const chrome: SiteCopy['chrome'] = {
  skipToTool: 'Skip to the generator',
  home: 'Generator',
  types: 'Code types',
  whyStatic: 'Why these never expire',
  privacy: 'Privacy',
  footerNote:
    'Free forever, no account, no expiry. Everything is generated in your browser — nothing you type is uploaded.',
  faqHeading: 'Questions people actually ask',
  otherTypes: 'Other kinds of code',
  readMore: 'Why these codes cannot expire',
  payloadHeading: 'What goes inside the code',
  builtBy: 'Just Give Me The QR',
  langSwitch: 'Español',
  source: 'Source code on GitHub',
  madeBy: 'Made by',
  developers: 'Prefill links',
  about: 'About',
  contact: 'Contact',
  paramsHeading: 'Parameters by type',
  paramsIntro: 'Field names are the query parameters. Aliases are accepted as well.',
  colParameter: 'Parameter',
  colField: 'Field',
  colAliases: 'Aliases',
};

const home: HomeCopy = {
  title: 'Just Give Me The QR — free QR code generator',
  description:
    'Make a QR code in your browser. Free forever, no account, no expiry. URLs, WiFi, WhatsApp, contacts and more. Nothing you type is uploaded.',
  h1: 'Just give me the QR',
  lead: 'Free forever. No account, no expiry, no subscription. Type, download, done.',
  sections: [
    {
      heading: 'Why this exists',
      body: [
        'Search for a free QR code generator and most of what you find is bait. You get a code in ten seconds, print five hundred flyers, and a few weeks later the code leads to a page asking your customers to upgrade a plan you never knew you were on. The generator did not break. It worked exactly as designed.',
        'That trick is only possible because those sites hand you a <strong>dynamic</strong> code: a code containing a short link to their server, which then redirects to your real destination. They control the redirect. Stop paying, and the redirect stops with it — while your flyers are still on the wall.',
        'The codes this site makes are <strong>static</strong>. Your link, your WiFi password, your phone number: the data is inside the black-and-white pattern itself. There is no middleman server to keep alive, no subscription to lapse, and no way for us to change or kill your code after you have downloaded it. Even if this site disappeared tomorrow, every code it ever made would keep working. <a href="/static-vs-dynamic">Here is the longer explanation</a>.',
      ],
    },
    {
      heading: 'What you get',
      body: [
        'Nine kinds of code — links, WiFi, WhatsApp, contact cards, plain text, email, SMS, phone numbers and map locations. PNG at up to 2048&nbsp;px for print, or SVG for anything that needs to scale. Your own colours, six shapes for the modules and the eyes, a logo in the middle if you want one, your own quiet zone and error-correction level. No watermark, no daily limit, no email address required.',
        'The whole tool is one page of JavaScript running on your device. Your data never touches a server because there is no server to touch — the site is a handful of static files. That is not a privacy promise we are asking you to believe; it is just how the thing is built — and <a href="https://github.com/Caml2001/justgivemetheqr.com">the code is public</a>, so you can read it.',
      ],
    },
    {
      heading: 'What this does not do',
      body: [
        'No scan tracking and no editable destinations. Both require a redirect server, and a redirect server is exactly the thing that can be switched off. If you genuinely need to change where a printed code points, <a href="/static-vs-dynamic">read this first</a> — there is a way to get most of that without renting anything.',
        'No bulk generation from a spreadsheet. No account, so nothing is saved between visits — if you want a code back, generate it again or keep the file. The logo you add stays in your browser tab too, so it is gone when you close it.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is it actually free, or free until it is not?',
      a: 'Actually free. There is no account to create, no trial to expire and no plan to upgrade to. The codes you download are yours as files — we could not revoke them if we wanted to.',
    },
    {
      q: 'What is the catch? How is this paid for?',
      a: 'The honest answer is that it costs almost nothing to run. This site is a few static files on a CDN, with no database, no accounts to support and no redirect server to keep alive. That is also precisely why the codes cannot expire.',
    },
    {
      q: 'Do my codes stop working if this site goes down?',
      a: 'No. A static QR code carries its own data. Once the PNG or SVG is on your disk, this site is irrelevant to it. Scanning does not contact us at any point.',
    },
    {
      q: 'Can you see what I put into the generator?',
      a: 'No. The QR code is drawn on your device by JavaScript running in your browser tab. Nothing is sent anywhere — you can check by opening your browser network tools while you type, or by going offline and watching the generator keep working. If you would rather read than test, <a href="https://github.com/Caml2001/justgivemetheqr.com">the source is on GitHub</a>.',
    },
    {
      q: 'Can I use these commercially?',
      a: 'Yes. Menus, packaging, business cards, event badges, shop windows, product manuals. No attribution required, no licence to buy.',
    },
    {
      q: 'Can I track how many people scan my code?',
      a: 'Not with a static code, and that is the trade-off. Counting scans means routing everyone through a server that logs them, which makes the code dependent on that server staying up and paid for. If you need the numbers, use analytics on the page the code points to instead — same information, nothing extra to rent.',
    },
    {
      q: 'PNG or SVG?',
      a: 'SVG for anything a printer will handle or anything that needs resizing — it stays sharp at any size. PNG for slides, social posts and quick sharing. If in doubt, 1024&nbsp;px PNG is fine for most printed material.',
    },
  ],
};

const staticVsDynamic: ArticlePageCopy = {
  title: 'Static vs dynamic QR codes, explained plainly',
  description:
    'Why a static QR code cannot expire, why vendor dynamic codes die with the subscription, and how to change a destination without renting a redirect.',
  h1: 'Static vs dynamic QR codes',
  lead: 'One of these can stop working. It is worth knowing which one you have before you print anything.',
  sections: [
    {
      heading: 'The whole difference in one sentence',
      body: [
        'A <strong>static</strong> QR code contains your data. A <strong>dynamic</strong> QR code contains someone else’s short link, which points at a server that redirects to your data. Everything else — the pricing pages, the trials, the codes that suddenly stop working — follows from that one difference.',
      ],
    },
    {
      heading: 'Why a static code cannot expire',
      body: [
        'A QR code is not a picture that refers to information stored somewhere. It <em>is</em> the information, written in a two-dimensional alphabet of black and white squares. When a phone reads <code>https://your-restaurant.example/menu</code> from a code, it is not looking anything up: it decoded that text directly out of the pattern, the way you decode letters out of ink.',
        'This is why a printed static code has no more of an expiry date than a printed phone number. Nobody can reach into a laminated card on a table and change what it says. There is no account behind it, no server keeping it alive, no company whose business decisions can reach it. The code will read the same in ten years as it does today, as long as the ink survives and the destination still exists.',
        'It also means the tool that made it is irrelevant afterwards. Generating a code is a one-time computation, not a subscription to a service. Once the file is on your disk, we are out of the picture entirely.',
      ],
    },
    {
      heading: 'What a dynamic code really is',
      body: [
        'A dynamic code contains something like <code>https://qr-vendor.example/a7Xk2</code>. Scanning it sends the phone to the vendor, who looks up <code>a7Xk2</code> in a database, finds your destination, and forwards the visitor. Two things become possible: you can change the destination after printing, and the vendor can count every scan on the way through.',
        'Both features come from the same fact — that every single scan has to pass through a server the vendor owns. You are not buying a code. You are renting a redirect, and the code on your poster is worth exactly as much as that rental agreement.',
      ],
    },
    {
      heading: 'How that actually fails',
      body: [
        'The common one is the free trial. Many generators do not say the word "trial" anywhere near the download button; you find out when the code starts showing an upgrade page, usually after the flyers are printed. Then there is the plan you did cancel, deliberately, having forgotten that a code on your packaging depended on it.',
        'Slower failures are worse because you cannot see them coming: the vendor is acquired and sunsets the old short domain, or shuts down, or lets the domain lapse, or moves the code behind a scan cap. In every case the failure lands on printed material you already paid for, and there is nothing you can do to the ink to fix it.',
      ],
    },
    {
      heading: 'When dynamic is genuinely the right call',
      body: [
        'It is a real product, not a scam, and sometimes it is the only option. If you must be able to change a destination after printing and you do not control a domain, or you need per-scan analytics that page analytics cannot give you, a dynamic code does something a static one cannot. Just go in knowing you are buying an ongoing dependency, budget for it permanently, and pick a vendor you would trust with a five-year commitment — because that is what a printed code is.',
      ],
    },
    {
      heading: 'How to change the destination without renting anything',
      body: [
        'Point a static code at a URL you already control, then change what lives at that URL. A code carrying <code>https://your-site.example/menu</code> is permanent, but the page at <code>/menu</code> is yours to edit, redirect or replace whenever you like. You get the flexibility of a dynamic code, the redirect is one you own, and the only thing you depend on is your own domain — which you were paying for anyway.',
        'For scan counts, put ordinary web analytics on that destination page. You will see visits, times and rough locations without a middleman, and the code keeps working even if you later remove the analytics entirely.',
      ],
    },
    {
      heading: 'How to tell which kind you already have',
      body: [
        'Scan the code with any phone and look at the address before you open it. If you see your own destination, it is static and it is safe. If you see a short link on a domain you do not recognise — usually the generator’s brand, or an unfamiliar three-letter domain — it is dynamic, and it will keep working exactly as long as that company decides it should.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can a static QR code be edited after printing?',
      a: 'No. The data is the pattern, so changing the destination means generating and reprinting a new code. Pointing it at a URL you control is the standard way around this.',
    },
    {
      q: 'Do static codes work without internet?',
      a: 'The scan itself always works offline, because decoding happens on the phone. Whether anything useful happens next depends on the content: WiFi, contact cards, plain text and phone numbers work with no connection at all, while a link obviously needs one to open.',
    },
    {
      q: 'Are static codes less reliable to scan?',
      a: 'They hold more data, so they have more squares and can look busier than a short dynamic link. Print them a little larger, keep the quiet zone, and they scan just as well. Shorter destination URLs keep the pattern simpler.',
    },
    {
      q: 'Is a dynamic code ever safer?',
      a: 'It is more flexible, not safer. It adds a company and a server between your customer and your content — one more thing that can go down, get hacked, change hands or start charging.',
    },
    {
      q: 'My printed code stopped working. Can I fix it?',
      a: 'Not the printed one, if it was dynamic and the redirect is gone. What you can do is generate a static replacement pointing at a URL you own, so the next print run never has this problem again.',
    },
  ],
};

const privacy: ArticlePageCopy = {
  title: 'Privacy — no accounts, no uploads, no cookies',
  description:
    'What this site does and does not collect. No accounts, no cookies, nothing you type is ever uploaded. Short, specific and true.',
  h1: 'Privacy',
  lead: 'Short version: your content never leaves your device, and there is nothing here to sign up for.',
  sections: [
    {
      heading: 'What happens to what you type',
      body: [
        'Nothing leaves your browser. Links, WiFi passwords, phone numbers, contact details — all of it is turned into a QR code by JavaScript running on your own device, and the resulting image is drawn locally. No request is made to any server with your content in it, because the site has no server to send it to.',
        'You do not have to take our word for it. Open your browser’s network tab and type into the generator: you will see no requests. Or load the page, disconnect from the internet, and keep generating codes — it works fine offline. And the whole site is open source: <a href="https://github.com/Caml2001/justgivemetheqr.com">the code is on GitHub</a>.',
      ],
    },
    {
      heading: 'Accounts, cookies and storage',
      body: [
        'There are no accounts, so there is nothing to sign up for and no profile to delete. The site sets no cookies. It does not write your input to local storage, so nothing you typed is left behind on a shared computer once the tab is closed — including the URL bar, unless you deliberately used a prefilled link.',
        'Prefilled links like <code>/wifi?ssid=Cafe&amp;password=hunter2</code> are a convenience for embedding the tool, and the values are visible to anyone who can see that link or your browser history. That is a property of links in general, but it is worth saying out loud on a page about WiFi passwords.',
      ],
    },
    {
      heading: 'Hosting',
      body: [
        'The site is served as static files by Cloudflare Pages. Like any host, Cloudflare handles the network request needed to deliver those files to you and may keep short-lived infrastructure logs — typically IP address, timestamp and the file requested — for security and abuse prevention. That is standard for any website you visit, we do not read those logs, and none of it contains what you typed into the generator.',
      ],
    },
    {
      heading: 'Scanning',
      body: [
        'Scanning a code you made here does not contact this site. The data is inside the code, so a scan is a purely local operation between a camera and a pattern. We cannot count your scans, and neither can anyone else who is not sitting on the destination.',
      ],
    },
  ],
  analytics: {
    on: {
      heading: 'Analytics',
      body: [
        'This site uses Cloudflare Web Analytics: a cookieless script that reports aggregate page views and referrers. It does not use cookies, does not fingerprint your device and does not follow you between sites. It records that a page was viewed, not who viewed it, and it never sees anything you type into the generator.',
      ],
    },
    off: {
      heading: 'Analytics',
      body: [
        'There is no analytics on this site at all. No page-view counter, no third-party scripts, nothing. If that ever changes it will be Cloudflare Web Analytics — cookieless and aggregate — and this page will say so before it is switched on.',
      ],
    },
  },
};


const developers: ArticlePageCopy = {
  title: 'Prefill links — link into the QR generator',
  description:
    'Every field of every QR type can be prefilled from a link. Parameter names, aliases and examples for embedding or linking to the generator.',
  h1: 'Prefill links',
  lead: 'Open the generator with the fields already filled in. Nothing is downloaded until the person clicks.',
  sections: [
    {
      heading: 'How it works',
      body: [
        'Every generator page reads its own fields from the query string. Send someone to <code>/wifi?ssid=Cafe%20Guest&amp;password=flatwhite</code> and they land on the WiFi generator with both fields filled in and the code already drawn. They still choose whether to download it — a link never triggers a download, and it never sets colours or shapes, which stay with the person making the code.',
        'This is the whole "API". There is no endpoint that returns an image, because there is no server: the QR code is rendered by JavaScript in the visitor’s browser. What you get instead is a stable link format you can build from a spreadsheet, a CMS, a chatbot or a printed instruction.',
      ],
    },
    {
      heading: 'Notes on values',
      body: [
        'URL-encode everything. Spaces become <code>%20</code>, ampersands <code>%26</code>, line breaks <code>%0A</code>. Boolean fields such as <em>hidden</em> accept <code>true</code>, <code>1</code>, <code>yes</code> or <code>on</code>. The home page also accepts <code>type=</code> to preselect a content type without visiting its own page.',
        'Anything you put in a link is visible to whoever sees the link, including a WiFi password. That is a property of links, not of this site, but it is worth remembering before you paste one into a group chat.',
        'A machine-readable description of the same parameters is published as an <a href="/openapi.json">OpenAPI document</a>, and a plain-text summary for language models at <a href="/llms.txt">/llms.txt</a>.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I get a PNG back from a URL?',
      a: 'No. Nothing is generated on a server. If you need images in bulk, the code is open source — run it yourself.',
    },
    {
      q: 'Can a link set the colours or the logo?',
      a: 'No, on purpose. Only content fields are prefillable, so a link cannot decide how someone else’s code looks.',
    },
    {
      q: 'Will the link format change?',
      a: 'Field names are the ones shown in the form and are meant to be stable. Aliases exist so that short links keep working.',
    },
    {
      q: 'Is there a rate limit?',
      a: 'There is nothing to limit. The pages are static files on a CDN.',
    },
  ],
};

const about: ArticlePageCopy = {
  title: 'About — why Just Give Me The QR exists',
  description:
    'A free, no-signup QR code generator that runs entirely in your browser, built out of frustration with free tools that quietly turn into subscriptions.',
  h1: 'About',
  lead: 'One person, one page of JavaScript, and a grudge against QR codes that stop working.',
  sections: [
    {
      heading: 'Why it was built',
      body: [
        'The first version of this site came from a very ordinary experience: needing a QR code for a menu, using a "free" generator, and finding a month later that the code opened an upgrade page instead of the menu. The generator had not broken. It had handed out a dynamic code — a short link to its own server — and switched the redirect off when the trial ended.',
        'A QR code is a cheap, thirty-year-old standard that a phone can read with no help from anyone. The only reason a code stops working is that someone put a server between the pattern and the destination and then turned it off. This site exists to make the other kind, and to explain the difference plainly enough that fewer people get caught.',
      ],
    },
    {
      heading: 'What it is',
      body: [
        'A static site: a handful of HTML pages and one small JavaScript file that draws QR codes on your device. No accounts, no database, no analytics by default, no uploads. It is hosted on a CDN, costs almost nothing to run, and would keep every code it ever made working even if it went offline tomorrow, because the codes never depended on it in the first place.',
        'The whole thing is open source. <a href="https://github.com/Caml2001/justgivemetheqr.com">The code is on GitHub</a>, including the tests that render every kind of code to pixels and scan it back to prove it decodes.',
      ],
    },
    {
      heading: 'Who',
      body: [
        'Made by <a href="https://charlymtz.com">charlymtz.com</a>. Bug reports, corrections to the copy and feature ideas are welcome through the <a href="/contact">contact page</a>.',
      ],
    },
  ],
};

const contact: ArticlePageCopy = {
  title: 'Contact — bugs, corrections and ideas',
  description:
    'How to report a bug, correct something on the site or suggest a feature. No support desk, no ticket system — a public issue tracker and a person.',
  h1: 'Contact',
  lead: 'There is no support desk, because there is nothing to support: no accounts, no subscriptions, no data. There is a person, though.',
  sections: [
    {
      heading: 'Found a bug or a wrong claim?',
      body: [
        'Open an issue on <a href="https://github.com/Caml2001/justgivemetheqr.com/issues">the GitHub repository</a>. That is the fastest route, it is public so others can find the same answer, and it is where fixes actually happen. If a code made here does not scan on a specific phone, say which content type, which phone and which scanner app — the same information a test needs.',
        'If you would rather not use GitHub, the author can be reached through <a href="https://charlymtz.com">charlymtz.com</a>.',
      ],
    },
    {
      heading: 'Things that are not a bug',
      body: [
        'A printed code that stopped working because the destination page moved is not something this site can fix — the code still says exactly what it said on the day it was made. Point it at a URL you control next time; the <a href="/static-vs-dynamic">static-vs-dynamic page</a> explains how.',
        'Requests for scan tracking or editable destinations will be declined kindly. Both require a redirect server, which is the one thing this site promises never to be.',
      ],
    },
    {
      heading: 'Business, press and licensing',
      body: [
        'The generator is free for personal and commercial use, with no attribution required. There is nothing to license and no partner programme. If you want to write about the site, everything worth quoting is already on it, and the source is public.',
      ],
    },
  ],
};

export { chrome, home, staticVsDynamic, privacy, developers, about, contact };
export type { TypePageCopy };
