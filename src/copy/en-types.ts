import type { TypePageCopy } from './types';

const wifi: TypePageCopy = {
  title: 'WiFi QR code generator — free, no signup',
  description:
    'Make a QR code that connects phones to your WiFi. Free, never expires, no account. Supports WPA/WPA2/WPA3, WEP and hidden networks.',
  h1: 'WiFi QR code generator',
  lead: 'Let people join your network by pointing a camera at a card instead of spelling out a password.',
  sections: [
    {
      heading: 'How a WiFi QR code works',
      body: [
        'The code does not open a website and does not talk to a server. It holds one line of text, in a format both iOS and Android recognise, naming the network, its security type and the password. The camera decodes that line on the phone and offers to join. The whole exchange happens between a camera and some ink.',
        'It also means the password sits in the code in plain form. Anyone who can photograph the card can read it — the point when it is taped to a café counter, and a reason not to publish the image publicly.',
      ],
    },
    {
      heading: 'Getting the details right',
      body: [
        'The network name must match exactly what the router broadcasts, capitals and spaces included: <code>Cafe Guest</code> and <code>cafe guest</code> are different networks. Special characters are handled for you — semicolons, colons, commas, quotes and backslashes are escaped automatically, so <code>Bar; Restaurant "Luna"</code> encodes correctly instead of truncating at the semicolon.',
        'Pick <strong>WPA</strong> for anything modern; the same setting covers WPA, WPA2 and WPA3. <strong>WEP</strong> is only for old routers. Choose <strong>Open</strong> for a network with no password. Tick <em>hidden network</em> only if the router genuinely does not broadcast its name — setting it wrongly can stop a phone finding the network at all.',
      ],
    },
    {
      heading: 'Where this does not work',
      body: [
        'Enterprise networks — a university or large office where each person has a username or certificate — cannot be expressed in this format at all. Guest networks behind a captive portal will connect and still show the sign-in page: the code joins the network, it cannot accept terms for you. Native scanning needs iOS 11 or Android 10; older phones need a QR app.',
      ],
    },
  ],
  payload: {
    caption: 'A WiFi code contains exactly this, and nothing else:',
    code: 'WIFI:T:WPA;S:Cafe Guest;P:flatwhite;H:false;;',
    legend: [
      '<code>T</code> — security type: <code>WPA</code>, <code>WEP</code> or <code>nopass</code>',
      '<code>S</code> — the network name, exactly as broadcast',
      '<code>P</code> — the password, empty on an open network',
      '<code>H</code> — whether the network is hidden',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Test with one iPhone and one Android before printing a batch.',
    'Print it at least 2.5&nbsp;cm across on a table card, larger for anything read at a distance.',
    'Print the network name underneath as text. Some guests will type it.',
    'Keep the white border. Cropping that quiet zone is the most common reason a code will not scan.',
  ],
  faqs: [
    {
      q: 'Does this work on an iPhone?',
      a: 'Yes, from iOS 11 onwards. Point the Camera app at the code and a banner appears offering to join the network — no app to install.',
    },
    {
      q: 'Does it work with WPA3?',
      a: 'Yes. Choose the WPA option; the same value covers WPA, WPA2 and WPA3 across every phone that supports this format.',
    },
    {
      q: 'Is my WiFi password sent to your server?',
      a: 'No, and there is no server to send it to. The code is generated in your browser tab. You can disconnect from the internet and the generator keeps working.',
    },
    {
      q: 'Can someone extract the password from the printed code?',
      a: 'Yes — a QR code is not encryption. Anyone who can scan or photograph it gets the password, exactly as if you had written it on the card. Treat the printed code as you would treat the written password.',
    },
    {
      q: 'Will it stop working if I change the password?',
      a: 'The code will keep saying what it always said, so it will offer the old password and fail. Change the password, generate a new code, reprint. Nothing expires on its own.',
    },
    {
      q: 'Can I use it for a university or office network?',
      a: 'Not if it asks for a username or installs a certificate. WPA-Enterprise networks cannot be described in this format at all.',
    },
  ],
};

const whatsapp: TypePageCopy = {
  title: 'WhatsApp QR code generator — free, no signup',
  description:
    'Make a QR code that opens a WhatsApp chat with you, with the first message already written. Free, no account, never expires.',
  h1: 'WhatsApp QR code generator',
  lead: 'A code that opens a chat with you — with the first message already typed, if you want it.',
  sections: [
    {
      heading: 'What the code actually contains',
      body: [
        'It holds an ordinary <code>wa.me</code> link with your number in it. Scanning opens WhatsApp on a chat with you, and neither of you has to save the other’s number first. If you added a message it appears already typed, and the sender still has to press send — which is what makes it useful for "Ask about the menu" prompts on a poster.',
        'One dependency worth being straight about: <code>wa.me</code> is a link handled by WhatsApp, so unlike a WiFi or contact code this one relies on a company keeping a domain alive. Nobody can switch off your specific code, but it is not as self-contained as the other types here.',
      ],
    },
    {
      heading: 'The number has to be international',
      body: [
        'Use the full country code with no plus sign and no leading zeros. Punctuation is stripped for you, so you can paste <code>+34 600 123 456</code> and it encodes as <code>34600123456</code>. A national-format number without a country code opens a broken chat for anyone scanning from abroad, and often at home too. The number also needs an active WhatsApp account, which no code can check for you.',
      ],
    },
    {
      heading: 'Sensible uses, and one warning',
      body: [
        'This works on a shop window for out-of-hours enquiries, a table card for ordering, delivery packaging for support, or a market stall where typing a number is friction nobody needs. A specific prefilled message also saves you the "which product?" round trip.',
        'The warning: printing a QR code with your number is publishing your number. Spammers scan posters too. For a business line that is expected; for a personal mobile, think twice.',
      ],
    },
  ],
  payload: {
    caption: 'A WhatsApp code is a plain link, with the message URL-encoded:',
    code: 'https://wa.me/34600123456?text=Hi%21%20I%20would%20like%20to%20order.',
    legend: [
      'the number is digits only — country code first, no <code>+</code>',
      '<code>?text=</code> is optional; leave the message blank and the chat opens empty',
      'spaces and accents are percent-encoded so every scanner reads them the same way',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Scan it with a phone that does not have your number saved — that is what your customers are.',
    'Keep the prefilled message short. Long messages make a denser code and get edited away anyway.',
    'Say what the code does next to it. "Chat with us on WhatsApp" scans better than a bare square.',
    'If you change your business number, the printed code is wrong forever. Reprint, do not patch.',
  ],
  faqs: [
    {
      q: 'Does the person scanning need my number saved?',
      a: 'No. That is the main reason to use one of these — the chat opens directly, with no contact to add first.',
    },
    {
      q: 'Is this the same as WhatsApp’s own QR code?',
      a: 'No. The one inside the WhatsApp app is for linking devices or adding a contact and it can be reset. This one is a plain wa.me link with your number in it, so it works from a printed poster and never expires.',
    },
    {
      q: 'Can I see who scanned it?',
      a: 'No. You will see whoever writes to you, which is the same thing minus the people who scanned and changed their mind.',
    },
    {
      q: 'Will the prefilled message send itself?',
      a: 'No, and it should not. It lands in the message box and the person presses send, so they can edit or delete it first.',
    },
    {
      q: 'Does it work for WhatsApp Business?',
      a: 'Yes. Any number with an active WhatsApp account works the same way, personal or business.',
    },
  ],
};

const vcard: TypePageCopy = {
  title: 'vCard QR code generator — free contact codes',
  description:
    'Turn contact details into a QR code that saves straight to a phone’s address book. vCard 3.0, free, no account, never expires.',
  h1: 'vCard QR code generator',
  lead: 'Put your contact details on a card, a badge or a shop window and let phones save them in one tap.',
  sections: [
    {
      heading: 'What a vCard code does',
      body: [
        'A vCard is the standard text format behind the contact files phones and email clients have exchanged for decades. Put one in a QR code and scanning opens the phone’s "new contact" screen with the fields already filled in — name, phone, email, company, address — ready to save. No app, no account, no upload.',
        'This site writes vCard 3.0 rather than 4.0. It is the version every phone, address book and CRM imports without complaint, and on a business card compatibility beats novelty.',
      ],
    },
    {
      heading: 'Keep it short, or it gets hard to scan',
      body: [
        'Contact codes are the densest kind here, because they carry the most text. Every field adds squares to the same square, and a detailed card at a high error-correction level can become genuinely awkward for older cameras at business-card size.',
        'If your code looks like static, drop the fields you do not need, or move the detail to a web page and put the link in the <code>Website</code> field. Level M is a good balance for print; H buys damage tolerance you rarely need on a card kept in a wallet.',
      ],
    },
    {
      heading: 'What the phone does with it',
      body: [
        'iPhones and Android phones both recognise a vCard from the stock camera and offer to create a contact; some show every field first, others save and let you edit. Fields you left blank are absent from the code entirely. The address is written into the structured address field, with street, city, region, postcode and country in their proper slots, which is what lets a phone offer directions later.',
      ],
    },
  ],
  payload: {
    caption: 'The code contains a small, readable text file:',
    code: [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Lovelace;Ada;;;',
      'FN:Ada Lovelace',
      'ORG:Analytical Engines',
      'TEL;TYPE=CELL,VOICE:+447700900123',
      'EMAIL;TYPE=INTERNET:ada@example.com',
      'END:VCARD',
    ].join('\n'),
    legend: [
      '<code>N</code> is the structured name, <code>FN</code> the display name',
      '<code>TEL</code> and <code>EMAIL</code> carry a type so phones file them correctly',
      'blank fields are left out entirely, keeping the code as small as possible',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Scan your own card with an iPhone and an Android before ordering five hundred.',
    'On a business card, print the code at least 2&nbsp;cm across and keep the white border intact.',
    'Fewer fields means a sparser, more reliable code. Website beats a long note.',
    'Use a work number. A printed contact code is a number you have published.',
  ],
  faqs: [
    {
      q: 'Does the person need an app to scan it?',
      a: 'No. The stock camera on any recent iPhone or Android reads it and offers to create the contact.',
    },
    {
      q: 'Why vCard 3.0 and not 4.0?',
      a: 'Because 3.0 is what everything imports cleanly. 4.0 is a better spec on paper and a worse experience in the wild.',
    },
    {
      q: 'My code looks very dense. Is that a problem?',
      a: 'It is a warning sign at small print sizes. Remove optional fields, or drop to error-correction level M or L, and the pattern opens up noticeably.',
    },
    {
      q: 'Can I update my details later?',
      a: 'Not in a printed code — it says what it says. Put a link to a page you control in the Website field if you expect the details to change.',
    },
    {
      q: 'Does it work on a phone with no signal?',
      a: 'Yes. Everything needed is inside the code, so saving the contact works with the phone in flight mode.',
    },
    {
      q: 'Can I add a photo of myself?',
      a: 'Technically the format allows it, and in practice it makes the code far too dense to scan. Use the website field instead.',
    },
  ],
};

const text: TypePageCopy = {
  title: 'Plain text QR code generator — free, no signup',
  description:
    'Put any text in a QR code — serial numbers, instructions, notes. Nothing is opened, nothing is uploaded. Free and never expires.',
  h1: 'Text QR code generator',
  lead: 'For when the code should just say something, with no link and nothing to open.',
  sections: [
    {
      heading: 'When plain text is the right choice',
      body: [
        'Most QR codes are instructions to a phone: open this, join that, call them. A text code carries words, and scanning simply shows them. Nothing opens, nothing is looked up, and no connection is needed at any point.',
        'That makes it right for things belonging to an object rather than to the internet: a machine’s serial number and service date, a shelf label, a batch number on a production line, a locker tag, care instructions on a garment, or a note for whoever finds a piece of equipment.',
      ],
    },
    {
      heading: 'What happens when someone scans it',
      body: [
        'The phone shows the text and usually offers to copy or share it. If the text contains something recognisable — a link, an email address — most cameras offer to act on it, but that is the phone being helpful rather than anything in the code. Because a text code has no destination, it cannot break, redirect or be tracked by anyone.',
      ],
    },
    {
      heading: 'Length, unicode and line breaks',
      body: [
        'The ceiling is 2,953 bytes at level L and 1,273 at level H, and the counter under the field tells you where you stand. Bytes are not characters: an accented letter costs two, most CJK characters three, an emoji four. Line breaks are preserved. Long text makes a dense code, and dense codes need printing larger — if it looks like grey noise, shorten it or size it up.',
      ],
    },
  ],
  payload: {
    caption: 'There is no format here at all. The code contains exactly what you typed:',
    code: 'Compressor 4B — serviced 2026-03-14 — next service 2026-09-14',
    legend: [
      'no scheme, no prefix, no encoding wrapper',
      'accents, symbols and emoji are stored as UTF-8 and round-trip unchanged',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Shorter text makes a sparser code that scans faster and from further away.',
    'For equipment that takes knocks, level Q or H keeps the code readable when part of the label is damaged.',
    'Print the critical part of the text next to the code as well. Labels outlive cameras.',
    'If the text is really a link, use the link type instead so phones offer to open it.',
  ],
  faqs: [
    {
      q: 'How much text fits in one QR code?',
      a: 'Up to 2,953 bytes at level L, 2,331 at M, 1,663 at Q and 1,273 at H. The counter below the field shows exactly how much you have used.',
    },
    {
      q: 'Do emoji and accents work?',
      a: 'Yes, encoded as UTF-8. They cost more bytes than plain letters, which is the only practical difference.',
    },
    {
      q: 'Will scanning it open anything?',
      a: 'No. The phone shows the text. If the text contains a link, the phone may offer to open it — that is the camera app being clever, not the code doing something.',
    },
    {
      q: 'Does it work offline?',
      a: 'Completely. Nothing is fetched, so it works in a basement, on a plane or in a warehouse with no signal.',
    },
    {
      q: 'Can I fit a whole document in one?',
      a: 'No, and it is the wrong tool for it. Past a few hundred characters the code gets dense and slow to scan; put the document online and use a link, or print the text.',
    },
  ],
};

const email: TypePageCopy = {
  title: 'Email QR code generator (mailto) — free',
  description:
    'Make a QR code that opens a new email to you, with the subject and message already written. Free, no account, never expires.',
  h1: 'Email QR code generator',
  lead: 'Opens a new email addressed to you, with the subject already filled in if you want it.',
  sections: [
    {
      heading: 'What the code does',
      body: [
        'It carries a <code>mailto:</code> link — the same thing behind an email link on a web page. Scanning it opens the phone’s mail app on a new draft addressed to you, with whatever subject and body you set already in place. The person still writes and sends it, so nothing happens without them.',
        'A prefilled subject is the quietly useful part. "Warranty claim — model X" or "Booking enquiry — poster at the station" turns an inbox of identical blank subjects into something you can filter, and tells you where the code was scanned without any tracking at all.',
      ],
    },
    {
      heading: 'How the parts are encoded',
      body: [
        'The address goes straight after <code>mailto:</code>. The subject and body become query parameters, percent-encoded so that spaces, accents, ampersands and line breaks survive intact — that is why the payload preview looks like <code>%20</code> soup. Leave a field blank and it is left out of the link entirely rather than sent empty.',
        'Line breaks in the body are kept, so a short template with a couple of lines arrives formatted. Long bodies make a dense code and get trimmed by some mail apps, so treat the body as a prompt rather than a letter.',
      ],
    },
    {
      heading: 'Where it gets inconsistent',
      body: [
        'The address is universally respected. The subject is respected almost everywhere. The body is where apps differ: most fill it in, a few ignore it, and a handful of in-app browsers open a webmail compose window that drops it. Test with the mail app your audience actually uses before printing.',
        'Also worth saying: a printed email QR code publishes your address to anyone with a camera, including people harvesting them. For a support or sales address that is the point; for a personal one, use an alias you can retire.',
      ],
    },
  ],
  payload: {
    caption: 'The code contains a standard mailto link:',
    code: 'mailto:hello@example.com?subject=Menu%20question&body=Hi%20there%2C',
    legend: [
      'the address comes first, immediately after <code>mailto:</code>',
      '<code>subject</code> and <code>body</code> are optional and percent-encoded',
      'blank fields are omitted rather than sent empty',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Use a subject that identifies where the code was printed. It is free routing information.',
    'Test on the default mail app of both an iPhone and an Android before a print run.',
    'Prefer a role address (support@, hello@) over a personal one on anything public.',
  ],
  faqs: [
    {
      q: 'Does the email send automatically?',
      a: 'No. It opens a draft. The person reads it, edits it and presses send, which is the only behaviour any phone will allow.',
    },
    {
      q: 'Why does the payload look full of percent signs?',
      a: 'That is percent-encoding, the standard way to put spaces and punctuation into a URL. Mail apps decode it back to normal text.',
    },
    {
      q: 'The subject appears but the body does not. Why?',
      a: 'Some mail apps and in-app browsers ignore the body parameter. Keep the important instruction in the subject if that matters to you.',
    },
    {
      q: 'Will this expose my address to spammers?',
      a: 'Anything printed in public can be scanned by anyone, including bots. Use an address you can filter or replace.',
    },
    {
      q: 'Can I put several addresses in one code?',
      a: 'Not reliably. Support for cc and multiple recipients varies too much between mail apps to recommend it on printed material.',
    },
  ],
};

const sms: TypePageCopy = {
  title: 'SMS QR code generator — free, no signup',
  description:
    'Make a QR code that opens a text message to your number, with the message already typed. Free, no account, never expires.',
  h1: 'SMS QR code generator',
  lead: 'Opens a text message to your number, with the message already written.',
  sections: [
    {
      heading: 'What it is for',
      body: [
        'Scanning opens the phone’s messaging app on a new message to your number, with your text already in the box. It is the lowest-friction way to collect a reply from someone who is standing in front of a sign: no app to install, no account, no data connection needed beyond mobile signal.',
        'The classic use is keyword opt-in — a poster that says "text JOIN to hear about gigs" becomes a code where JOIN is already typed. It is also useful for reporting: a code on a bin, a bus stop or a broken machine, with the asset number prefilled so you learn which one without asking.',
      ],
    },
    {
      heading: 'The format, and why it varies',
      body: [
        'This site writes <code>SMSTO:number:message</code>, which is the format with the broadest scanner support. You may also see <code>sms:</code> links, and some readers prefer that spelling, but SMSTO is what most camera apps handle correctly when a message body is involved.',
        'Include the country code for anything that might be scanned by a visitor. The tool removes spaces, dashes and brackets for you but keeps a leading plus, so pasting a number in any readable format works. Short codes work too — just type the short code as the number.',
      ],
    },
    {
      heading: 'What to warn people about',
      body: [
        'The message is not free for the sender. It goes out at their normal rate, and premium or short-code numbers can cost noticeably more, so say what the message costs anywhere the number is not obviously a normal mobile.',
        'Nothing sends on its own: the person presses send, and can edit the text first. That means the keyword you prefilled can be changed, so do not rely on it as a password or as a way of identifying who scanned.',
      ],
    },
  ],
  payload: {
    caption: 'The code contains one short line:',
    code: 'SMSTO:+34600123456:JOIN',
    legend: [
      'the number keeps a leading <code>+</code>; spaces and dashes are stripped',
      'everything after the second colon is the prefilled message',
      'leave the message blank and the code opens an empty conversation',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Keep the keyword short and unambiguous — it is what people will retype when scanning fails.',
    'Include the country code if strangers or tourists will scan it.',
    'State the cost near the code when the number is not a standard mobile.',
  ],
  faqs: [
    {
      q: 'Does it send the message by itself?',
      a: 'No. It opens the messaging app with the text ready, and the person presses send.',
    },
    {
      q: 'Why SMSTO and not sms:?',
      a: 'SMSTO is handled correctly by more scanners when a message body is included. Both exist; this one fails less often.',
    },
    {
      q: 'Can I use a short code?',
      a: 'Yes. Type the short code where the number goes, and leave the country code off.',
    },
    {
      q: 'Does the sender pay?',
      a: 'Yes, at their standard rate, or more for premium numbers. Say so on the poster.',
    },
    {
      q: 'Can I see who scanned without sending?',
      a: 'No. You only ever see the messages that are actually sent, which is a feature as much as a limitation.',
    },
  ],
};

const phone: TypePageCopy = {
  title: 'Phone number QR code generator — free',
  description:
    'Make a QR code that dials your number. Free, no account, never expires. Works from any camera, with no app to install.',
  h1: 'Phone number QR code generator',
  lead: 'Point a camera at it and the phone offers to call you. No typing, no misdialled digits.',
  sections: [
    {
      heading: 'What happens when it is scanned',
      body: [
        'The code holds a <code>tel:</code> link. The camera shows the number and asks whether to call it — no phone will dial straight from a scan, which is exactly the safety behaviour you want on something printed in public.',
        'It removes the most common failure in printed contact details: transcription. Nobody mistypes a digit, nobody drops a country code, and nobody has to hold a leaflet in one hand while dialling with the other.',
      ],
    },
    {
      heading: 'Write the number for strangers',
      body: [
        'Include the country code, in the international form, for anything that might be scanned by someone from elsewhere — a hotel, a station, a tourist area, packaging that ships. <code>+34600123456</code> works from any country; <code>600123456</code> works only from inside Spain.',
        'Formatting is up to you: spaces, dashes and brackets are stripped automatically, and a leading plus is kept. Extensions are the one thing to avoid, since support for pauses and <code>;ext=</code> is inconsistent enough that a main number plus a printed instruction is more reliable.',
      ],
    },
    {
      heading: 'Where a call code beats the alternatives',
      body: [
        'Use it on trade signage, delivery notices, taxi and workshop stickers, machine faceplates, real-estate boards and anywhere someone is standing outdoors with one free hand. It also works offline in the sense that matters: no data connection is needed, only signal.',
        'If you would rather receive a message than a call, an SMS or WhatsApp code is often better for the same surface — they let people write to you outside opening hours instead of hanging up.',
      ],
    },
  ],
  payload: {
    caption: 'The simplest payload on the site:',
    code: 'tel:+34600123456',
    legend: [
      'the <code>+</code> is kept; spaces, dashes and brackets are removed',
      'phones always ask before dialling, so a scan can never place a call by itself',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Use the international format with the country code on anything a visitor might scan.',
    'Print the number as text next to the code. It is short, and people trust digits they can see.',
    'Label the code "Call us" — a bare square gives no reason to raise a camera.',
    'On outdoor signage, print it large and keep the quiet zone; scanning distance scales with size.',
  ],
  faqs: [
    {
      q: 'Will it dial without asking?',
      a: 'No. Every phone shows the number and waits for a tap. That behaviour is deliberate and cannot be overridden by a code.',
    },
    {
      q: 'Do I need the country code?',
      a: 'Include it whenever someone from another country might scan it. It costs three characters and prevents a call that never connects.',
    },
    {
      q: 'Can I include an extension?',
      a: 'Support for extensions is unreliable across phones. Encode the main number and print the extension next to the code.',
    },
    {
      q: 'Does it work without internet?',
      a: 'Yes. Decoding is local and calling needs only mobile signal, not data.',
    },
    {
      q: 'What if my number changes?',
      a: 'A printed code is permanent, so it will keep offering the old number. Generate a new one and reprint.',
    },
  ],
};

const location: TypePageCopy = {
  title: 'Location QR code generator (geo:) — free',
  description:
    'Turn coordinates into a QR code that opens a map at that exact spot. Free, no account, never expires.',
  h1: 'Location QR code generator',
  lead: 'Coordinates in, a code that drops a pin at the exact spot out.',
  sections: [
    {
      heading: 'When coordinates beat an address',
      body: [
        'A postal address is a lookup, and lookups fail. Field gates, festival entrances, trailheads, building-site access roads, remote holiday lets, the loading bay behind a shop — all places where the address takes people to roughly the wrong spot, or to no spot at all.',
        'A <code>geo:</code> code carries latitude and longitude directly, so the map opens on the exact point rather than a best guess. It is the difference between "the venue" and "the gate you can actually drive through".',
      ],
    },
    {
      heading: 'Finding your coordinates',
      body: [
        'In Google Maps, right-click the exact point and the first menu item is the coordinate pair, ready to copy. On a phone, drop a pin and read them from the place card. Paste them as decimal degrees — <code>41.3874</code>, not <code>41&deg;23&#39;14&quot;N</code>. Latitude runs -90 to 90 and longitude -180 to 180; anything outside is refused rather than encoded into a code that leads nowhere. Four or five decimals puts you within a few metres.',
      ],
    },
    {
      heading: 'The honest compatibility warning',
      body: [
        'Android handles <code>geo:</code> links well: scanning opens the default map app on the point. iPhones are inconsistent — depending on the iOS version and scanning app, the link may open a map or just show you the raw text.',
        'So test with an iPhone before printing anything that matters. If it misbehaves, use the link type with a normal maps URL instead: a denser code that opens reliably everywhere, at the cost of depending on that map provider.',
      ],
    },
  ],
  payload: {
    caption: 'The whole payload is the coordinate pair:',
    code: 'geo:41.3874,2.1686',
    legend: [
      'latitude first, then longitude, separated by a comma',
      'decimal degrees only, negative for south and west',
      'no map provider is named, so the phone uses whichever map app it prefers',
    ],
  },
  tipsHeading: 'Before you print it',
  tips: [
    'Scan it with an iPhone and an Android. This is the one type where the two genuinely differ.',
    'Four or five decimal places is plenty. More digits only make the code denser.',
    'Print the address underneath as a fallback for anyone whose phone shows raw text.',
    'For an entrance or a gate, pin the point people should drive to, not the middle of the building.',
  ],
  faqs: [
    {
      q: 'Which map app does it open?',
      a: 'Whichever the phone prefers. The code names coordinates, not a provider, so no company sits between the scan and the map.',
    },
    {
      q: 'Does it work on an iPhone?',
      a: 'Sometimes, depending on the iOS version and scanning app. Test before printing, and use a maps link if it does not behave.',
    },
    {
      q: 'Can I use an address instead of coordinates?',
      a: 'Not in a geo: code — the format only takes coordinates. Use the link type with a maps URL if you want to encode a search.',
    },
    {
      q: 'How precise should the coordinates be?',
      a: 'Five decimal places is roughly a metre. Four is roughly ten metres and is enough for almost every practical use.',
    },
    {
      q: 'Does it need internet?',
      a: 'Reading the code does not. Showing the map does, unless the phone has offline maps for that area.',
    },
  ],
};

export { wifi, whatsapp, vcard, text, email, sms, phone, location };
