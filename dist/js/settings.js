const discordChannels = [
	{title: `#thread-tags`, hook: `1437615399834357931/qvAK7a1SmeEQF-KiQ7hdJLTGVst6Ii3etR-M2tG2gn47U10yHC4gc9KLT5OEpQzC6w0a`},
	{title: `#comm-tags`, hook: `1437615490754412738/q7cFWQo_2fNGSwbFnj0BqfGqNzQVM-JHmG9u3_FHu4tbe2veIrLQFUtQWLEkb-QnSZJ1`},
	{title: `#open-threads`, hook: `1437615544651092130/qpaJfb2FIXyTfGzW2krc51QJaMvFR-7L-vVvKyHpKO0-mZQRdLyIXUVYlRAZcqeHDlup`},
	{title: `#open-comms`, hook: `1437615603371348172/rhNsL1gLSIASJZkFkX8I5aGYiSDT_hnVmxuZHii_8eckktbG0sHoXToDniJpZ0V6LJgR`},
];

const discordTags = [
    {alias: `Lux`, id: `253627726886469642`},
    {alias: `Spyder`, id: `189583247141765120`},
];

const discordRoles = [
    {title: `Open`, id: `&1437585224547565738`},
];

const staffDiscordRole = `1437580742962974741`;

const uploads = `uploads2`;
const siteName = `idolsandichor`;
const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const defaultSquare = 'https://files.jcink.net/uploads2/idolsandichor/VibeImages/aesthetic_2.jpg';
const checkboxChecked = `<i class="fa-light fa-sharp fa-xmark"></i>`;
const approvedText = `approved`;

const colors = {
    'apus': [237, 96, 195],
    'columba': [126, 165, 150],
    'corvus': [130, 113, 137],
    'crater': [235, 205, 149],
    'delphinus': [91, 151, 87],
    'draco': [216, 173, 189],
    'fornax': [161, 99, 84],
    'lupus': [198, 115, 205],
    'lyra': [176, 186, 129],
    'norma': [84, 149, 188],
    'pictor': [214, 116, 58],
    'pyxis': [44, 100, 186],
}

const unusable = ['premium group', 'extended reserve'];

const staffGroups = ['4'];
const oocGroups = [...staffGroups, '6'];
const optGroups = ['1', '3', '5'];

const templateWraps = `tag-wrap`;

const markdownSafe = `.markdown, .postcolor.no-template, .postcolor blockquote, .postcolor [data-markdown], .postcolor tag-wrap`;

const bbcode = [
    {
        groupName: "Text",
        tags: [
            {
                tag: "h2",
                type: "simple",
                displayName: "H2"
            },
            {
                tag: "h2serif",
                type: "simple",
                displayName: "Serif H2"
            },
            {
                tag: "h3",
                type: "simple",
                displayName: "H3"
            },
            {
                tag: "h4",
                type: "simple",
                displayName: "H4"
            },
            {
                tag: "h5",
                type: "simple",
                displayName: "H5"
            },
            {
                tag: "h6",
                type: "simple",
                displayName: "H6"
            },
            {
                tag: "h7",
                type: "simple",
                displayName: "H7"
            },
            {
                tag: "h8",
                type: "simple",
                displayName: "H8"
            },
            {
                tag: "b",
                type: "simple",
                displayName: "Bold"
            },
            {
                tag: "i",
                type: "simple",
                displayName: "Italic"
            },
            {
                tag: "u",
                type: "simple",
                displayName: "Underline"
            },
            {
                tag: "s",
                type: "simple",
                displayName: "Strikethrough"
            },
            {
                tag: "strong",
                type: "simple",
                displayName: "Alt Color"
            },
            {
                tag: "accent",
                type: "simple",
                displayName: "Accent Color"
            },
            {
                tag: "translate",
                desc: "Text that can be toggled between translations",
                type: "complex",
                displayName: "Translate",
                complexIndicator: "english translation"
            },
            {
                tag: "spoiler",
                desc: "Text hidden behind a spoiler",
                type: "simple",
                displayName: "Spoiler"
            }
        ]
    },
    {
        groupName: "Blocks",
        tags: [
            {
                tag: "tw",
                desc: "Wrap selected text in a trigger warning style that will pass into the discord tagger.",
                type: "simple",
                displayName: "Triggers"
            },
            {
                tag: "note",
                desc: "Wrap selected text in a note style that will pass into the discord tagger.",
                type: "simple",
                displayName: "Note"
            },
            {
                tag: "blockquote",
                type: "simple",
                displayName: "Blockquote"
            }
        ]
    },
    {
        groupName: "Posting",
        tags: [
            {
                tag: "post1",
                desc: "Use a basic post template",
                type: "complex",
                displayName: "Simple Post",
                complexIndicator: "theme number"
            },
            {
                tag: "post2",
                desc: "Post template with a title",
                type: "complex",
                displayName: "Titled Post",
                complexIndicator: "title"
            },
            {
                tag: "post3",
                desc: "Post template with an image",
                type: "complex",
                displayName: "Post with Image",
                complexIndicator: "image url"
            },
            {
                tag: "post4",
                desc: "Post template with a quote/tagline",
                type: "complex",
                displayName: "Post with Quote",
                complexIndicator: "quote / tagline"
            },
        ]
    },
    {
        groupName: "Comms",
        tags: [
            {
                tag: "msg",
                type: "simple",
                displayName: "Message"
            },
            {
                tag: "action",
                type: "simple",
                displayName: "Action"
            },
        ]
    },
    {
        groupName: "Socials",
        tags: [
            {
                tag: "bio",
                type: "simple",
                displayName: "Profile"
            },
            {
                tag: "contact",
                type: "complex",
                displayName: "Display Name",
                complexIndicator: "Account ID #",
                simpleIndicator: "Name"
            },
            {
                tag: "gallery",
                type: "simple",
                displayName: "Gallery"
            },
            {
                tag: "image",
                type: "simple",
                displayName: "Image"
            },
            {
                tag: "comment",
                type: "simple",
                displayName: "Comment / Caption"
            },
            {
                tag: "react",
                type: "simple",
                displayName: "React"
            },
        ]
    },
    {
        groupName: "Dev",
        tags: [
            {
                tag: "images",
                desc: "",
                type: "complex",
                complexIndicator: "column count",
                simpleIndicator: "images - use the image bbcode"
            },
            {
                tag: "image",
                desc: "",
                type: "simple"
            },
            {
                tag: "unsourced",
                desc: "",
                type: "complex",
                displayName: "Unsourced Quote",
                simpleIndicator: "quote",
                complexIndicator: "size"
            },
            {
                tag: "sourced",
                desc: "",
                type: "complex",
                displayName: "Sourced Quote",
                simpleIndicator: "quote",
                complexIndicator: "source"
            },
            {
                tag: "timeline",
                desc: "",
                type: "simple"
            },
            {
                tag: "year",
                desc: "",
                type: "simple"
            },
            {
                tag: "month",
                desc: "",
                type: "simple"
            },
            {
                tag: "day",
                desc: "",
                type: "simple"
            },
            {
                tag: "songs",
                desc: "",
                type: "simple",
                displayName: "Manual Playlist"
            },
            {
                tag: "song",
                desc: "",
                type: "complex",
                complexIndicator: "song name",
                simpleIndicator: "artist",
                displayName: "Manual Song"
            },
            {
                tag: "playlist",
                desc: "",
                type: "simple",
                simpleIndicator: "Embed SRC URL",
                displayName: "Spotify Playlist"
            },
            {
                tag: "songembed",
                desc: "",
                type: "simple",
                simpleIndicator: "Embed SRC URL",
                displayName: "Spotify Song"
            },
        ]
    },
    {
        groupName: "Groups",
        tags: [
            {
                tag: "Apus",
                desc: "",
                type: "simple"
            },
            {
                tag: "Colomba",
                desc: "",
                type: "simple"
            },
            {
                tag: "Corvus",
                desc: "",
                type: "simple"
            },
            {
                tag: "Crater",
                desc: "",
                type: "simple"
            },
            {
                tag: "Delphinus",
                desc: "",
                type: "simple"
            },
            {
                tag: "Draco",
                desc: "",
                type: "simple"
            },
            {
                tag: "Fornax",
                desc: "",
                type: "simple"
            },
            {
                tag: "Lupus",
                desc: "",
                type: "simple"
            },
            {
                tag: "Lyra",
                desc: "",
                type: "simple"
            },
            {
                tag: "Norma",
                desc: "",
                type: "simple"
            },
            {
                tag: "Pictor",
                desc: "",
                type: "simple"
            },
            {
                tag: "Pyxis",
                desc: "",
                type: "simple"
            },
        ]
    },
    {
        groupName: "Staff Only",
        extraClasses: 'staffOnly',
        tags: [
            {
                tag: "LuxImage",
                desc: "",
                type: "complex"
            },
            {
                tag: "LuxQuote",
                desc: "",
                type: "complex"
            },
            {
                tag: "LuxCombo",
                desc: "",
                type: "complex"
            },
            {
                tag: "SetImage",
                desc: "",
                type: "complex",
                displayName: "Lux Set Image",
                complexIndicator: "Position"
            },
            {
                tag: "SetQuote",
                desc: "",
                type: "simple",
                displayName: "Lux Set Quote",
            },
            {
                tag: "SpyPost",
                desc: "",
                type: "complex",
                displayName: "SpyPost",
                complexIndicator: "Image"
            },
        ]
    },
];

/** auto-tracker code by FizzyElf - https://fizzyelf.jcink.net **/
//these are the category and forum ids for a profile-based thread autotracker by fizzyelf
trackerParams = {
    //include
    includeCategoryIds: [2, 3, 4].map(item => item.toString()),
    includeForumIds: [].map(item => item.toString()),
    ignoreForumIds: [1, 2, 4, 5, 23, 24, 25, 26, 28, 29, 39, 40].map(item => item.toString()),

    //define au, comm, dev, archive forums
    historyForumIds: [38].map(item => item.toString()), //history
    commForumIds: [15].map(item => item.toString()), //comm
    commHistoryForumIds: [32].map(item => item.toString()), //comm history
    socialForumIds: [17, 18, 19, 21, 22].map(item => item.toString()), //social
    socialHistoryForumIds: [33, 34, 35, 36, 37].map(item => item.toString()), //social history
    devForumIds: [41, 42].map(item => item.toString()), //dev
    devHistoryForumIds: [30].map(item => item.toString()), //dev history
    reqForumIds: [9, 10, 11, 12, 13].map(item => item.toString()), //requests
    reqHistoryForumIds: [14].map(item => item.toString()), //request history
    eventForumIds: [].map(item => item.toString()), //events - NOT USING on this skin
    eventHistoryForumIds: [].map(item => item.toString()), //event history - NOT USING on this skin
}

const fullWidthFields = [1, 11, 47, 14, 25, 26, 31, 36, 41, 42, 43, 44, 45, 46];
const thirdWidthFields = [6, 7, 8, 17, 18, 19];
const setHeightFields = [15, 16, 36];
const requiredFields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48,49, 50, 51, 52, 53, 54, 55, 62, 64];

//toggle fields: account type, image type
const toggleFields = createFieldArray([1, 26, 31], true);
const memberFields = createFieldArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
const memberInputs = createFieldArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], true);
const characterFields = createFieldArray([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 64]);
const deityFields = createFieldArray([27, 28]);
const heroFields = createFieldArray([29, 30]);
const creatureFields = createFieldArray([31]);
const beastFields = createFieldArray([32, 63]);
const spiritFields = createFieldArray([33, 62]);
const mortalFields = createFieldArray([34, 35]);
const aestheticImageFields = createFieldArray([48, 49, 50, 51, 52, 53, 54, 55]);
const avatarImageFields = createFieldArray([47]);

const allHeaders = [
    {
        sectionTitle: `Account`,
        insertBefore: 1,
        sectionDescription: ``,
    },
];
const memHeaders = [
    {
        sectionTitle: `Player`,
        insertBefore: 2,
        sectionDescription: `<p>All member fields are <u>mandatory</u>. Once filled out, the button at the bottom of the page will change and allow submission of the information to the Google Sheet that pulls the data into all your profiles. This allows you to only need to update your information on one account when something changes- and it will change across all of them within minutes!<p>`,
    },
    {
        sectionTitle: `Images`,
        insertBefore: 47,
        sectionDescription: `<div class="ucp--image-previews"><div class="clip-avatar">
<div class="h6">Avatar</div>
<div class="clip-avatar-image"></div>
</div>
</div>`,
    },
];
const charHeaders = [
    {
        sectionTitle: `Basics`,
        insertBefore: 14,
        sectionDescription: `<p>All required fields are marked with an asterisk. Optional fields will hide on your profile if not filled out, so please leave them blank. Content warnings are not marked as required - however, if your profile contains triggering material, consider this field required anyway.</p>
<p>Please note that for birth year, you may use negatives to indicate BC years.</p>
<p><b>For deities,</b> pantheon should only be the pantheon title (e.g., "Greek", not "Greek Pantheon"), and domain is the list of things they are god/goddess of.</p>
<p><b>For heroes,</b> parent should be the name of their deity parent with pantheon (e.g., "Zeus of the Greeks") and Gift(s) should be their non-mortal abilities they have due to their godly parentage.</p>
<p><b>For creatures,</b> there are different fields for beasts vs spirits. Beasts will have species and, where applicable, subspecies. Spirits will have element and subtype. These are dropdowns, so should be more self-explanatory!</p>
<p><b>For mortals,</b> denomination is the pantheon they worship (e.g., "Greek", not "Greek Pantheon") or, if they do not worship, then please use "non-worshipping". Patron deity is the specific god or goddess that they worship primarily - and in this case you can just use their name, as we already know the pantheon!</p>`,
    },
    {
        sectionTitle: `Details`,
        insertBefore: 41,
        sectionDescription: `<p>This section includes your character's Cheatsheet and Freeform. The Cheatsheet is a bullet-point set of notes about your character and should ideally provide a summary of the most important things to know about them. The Freeform content is entirely up to you- and while there's no minimum length for it, it should give us another taste of what your character is like. Feel free to reach out in the Discord server for freeform ideas if you find yourself drawing a blank!</p>
<p>On the other hand, if you happen to hit the character maximum for the freeform, use the Freeform Overflow to continue writing. In most cases, however, this field can simply be left blank.</p>
<p>Most, if not all, of our HTML-based codes in our Code Bank should work in our freeform.</p>
<p>It is worth noting that these, and most, sections of the application do support some limited markdown options for easier coding. These include ** on either side to bold, __ on either side to italicize, ~~ on either side to strikeout, and || on either side to spoiler. Additionally, we have quicker ways to do lists available as markdown. The code is below:</p>

<div class="code-accordion">
<div class="h7 accordion--trigger">Code</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button><pre><textarea class="scroll"><tl>+ item
+ item
+ item</tl></textarea></pre>
</tag-code>
</div></div>`,
    },
    {
        sectionTitle: `Relationships`,
        insertBefore: 44,
        sectionDescription: `<p>This is more for your reference than anything else, but we still expect it to be filled out. Here you can keep track of any relationships developing with your character, from friendships to rivalries to romances. We do ask that you use the pre-formatted options available to you, however, so we've provided them below:</p>

<div class="code-accordion">
<div class="h7 accordion--trigger">Headers</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button>
<pre><textarea class="scroll"><tag-relheader>Content</tag-relheader></textarea></pre>
</tag-code>
</div></div>

<div class="h7 accordion--trigger">Relationships - Not Linked</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button>
<pre><textarea class="scroll"><tag-rel><b>Name</b>
<span>Content (Can be a block of text or a list)</span></tag-rel></textarea></pre>
</tag-code>
</div></div>

<div class="h7 accordion--trigger">Relationships - Linked</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button>
<pre><textarea class="scroll"><tag-rel><a href="url">Name</a>
<span>Content (Can be a block of text or a list)</span></tag-rel></textarea></pre>
</tag-code>
</div></div>
</div>`,
    },
    {
        sectionTitle: `Plotting`,
        insertBefore: 45,
        sectionDescription: `<p>This section serves as your "shipper" on-site and should give others some ideas for potential plots you're looking for, as well as plots you have no interest in pursuing. Please do not leave either field blank; we ask you provide at least a few solid ideas in the "Plot Hooks" field, and if you are open to any plot types at all, please write that in the "Not Interested" field as well rather than leaving it empty.</p>`,
    },
    {
        sectionTitle: `Images`,
        insertBefore: 47,
        sectionDescription: `<div class="ucp--image-previews"><div class="clip-avatar">
<div class="h6">Avatar</div>
<div class="clip-avatar-image"></div>
</div>
<div class="ucp--aesthetics">
<div class="h6">Aesthetics</div>
<div class="clip-aesthetics">
<div class="profile--aesthetics top-left"></div>
<div class="profile--aesthetics bottom-right"></div>
</div>
</div>
</div>`,
    },
    {
        sectionTitle: `Links`,
        insertBefore: 56,
        sectionDescription: `<p>These are for optional links to further information/resources for your character! Some things you might include here are links to your development forum/threads, links to playlists, or even to a Pinterest board you've put together. You can even place wanted ads here! Please leave these fields blank if you do not want to use them, and please keep the titles on the shorter side- 1 to 2 words each.</p>`,
    },
];

const membersJson = `Members`;
const claimsJson = `Claims`;
const plotsJson = `Plots`;
const businessesJson = `Businesses`;
const groupsJson = `Groups`;
const locationsJson = `Locations`;
const creaturesJson = `Creatures`;
const canonsJson = `Canons`;
const combinedReservesJson = `CombinedReserves`;
const plotReservesJson = `PlotReserves`;


const sheetID = {
    claims: '1L8s1OSFgQYAOfKDib_JRKN-e-7bOgAF-_zu-XOX03mM',
    info: '1gG6PUteNb96nG7V-2pWu9M6tdoh7MAdq_ATMjvE1_nY'
};
const deployID = {
    claims: 'AKfycbzMs3nRGv80YK4xuSEDI31Xu_H-J-kB7jGAZCALZaBP-Q19SsA5dZLfa2iT9VKByH1oDA',
    info: 'AKfycbwsYTMDa3I0J58o08_OsDSY_GZqLyKRdYbRyns5jKYKle4W9_FdY2DBojrkgriWZYbF9w'
};
const reserveLogs = `1437625982445162627/seG--Ny1AMjSawQHzMe079OM_ZGfHBz6cciGwcr_LJGpsUrLUDfqXdaeWbKRXyXsiGlj`;
const businessLogs = `1437626126355660840/tOeZo6pfI1UXtoGSs_Bh7vThYSkHeCC0RL8VlAnbl765bcFYMhrFnGzu2MwQGxXdQISA`;
const claimLogs = `1437626055425785989/d2fQZXyrVwrRXqJRccCAqeoYGuYiitukhfoECAwuVsM-Y3PlzBPsS1Zz8oAN9vXEZEul`;
const modLogs = `1437625780178780283/ZYV7vYPaVMHv0AQXjFzm-FdM9_4cYRRN_CPHhC7hGXy7xziYdxSukmy4fo1q2rf3PWA7`;
const staffLogs = `1437626199403921611/Z3BLs4q2PiV0fpLwjwLpxt9RV2VP-OO16l6LeSEtVsxCmIlSGrOyVdDZl95YotCSg1em`;
const sortLogs = `1437614910984028294/k5xEYtWoZjXmPie3OWrTSuxhGjM-1r5Aj00UalDjDspTfmAwwfPJNyt4y6mEbsU5EhBP`;
const staffSortLogs = `1437625604563406868/GxB6aPPbevJtXWx1huJwSowNKKcZcCG-7Qz8BCu1UCFC_d1dxEZUrzLAwo_sO_R7mr9m`;
const announceLogs = `1437615164768784394/KBbzKVSQTbVcNwkEuN0staJhIi3hsTkSlmSDk247MmNIEI9VqNMQXZ1h3NRyExUOEp9j`;

const defaultReserve = 14;
const sheetConnectionError = `<blockquote class="fullWidth">There was an error with the sheet connection - we're so sorry! Please go back to the form and try again.</blockquote>
<button onclick="reloadForm(this)" type="button" class="fullWidth submit">Back to form</button>`;
const successMessage = `<blockquote class="fullWidth">Submission successful!</blockquote>
<button onclick="reloadForm(this)" type="button" class="fullWidth submit">Back to form</button>`;
const activeResExists = `<blockquote class="fullWidth warning">Uh-oh! That's already reserved. Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
const instancesCapped = `<blockquote class="fullWidth warning">Uh-oh! This role has reached the maximum number of claims and reserves. Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
const prevResExists = `<blockquote class="fullWidth warning">Uh-oh! You've reserved that before! Reserves are non-renewable. If you don't remember doing this, please reach out to staff via Discord and we can review our records and discuss options with you!</blockquote>`;
const claimExists = `<blockquote class="fullWidth warning">Uh-oh! This is already in play! Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
const limitReached = `<blockquote class="fullWidth warning">Uh-oh! This role has limited spots and it looks like they're all taken and/or reserved at this moment!</blockquote>`;
const completedButton = `<button onClick="submitMemberData(this)" type="button" class="hidden sheet-button">Submit Member Data</button>`;

const jcinkUCPLinks = `<div class="accordion--trigger" data-category="account"><b>Account</b></div>
        <div class="accordion--content" data-category="account"><div class="accordion--inner">
            <a href="?act=UserCP&CODE=01">Edit Profile</a>
            <a href="?act=UserCP&CODE=24">Update Avatar</a>
            <a href="?act=UserCP&CODE=54">Sub-accounts</a>
            <a href="?act=UserCP&CODE=52">Edit Username</a>
            <a href="?act=UserCP&CODE=28">Change Password</a>
            <a href="?act=UserCP&CODE=08">Update Email</a>
        </div></div>
        <div class="accordion--trigger" data-category="messages"><b>Messages</b></div>
        <div class="accordion--content" data-category="messages"><div class="accordion--inner">
            <a href="?act=Msg&CODE=01">Inbox</a>
            <a href="?act=Msg&CODE=04">Send Message</a>
        </div></div>
        <div class="accordion--trigger" data-category="tracking"><b>Tracking</b></div>
        <div class="accordion--content" data-category="tracking"><div class="accordion--inner">
            <a href="?act=UserCP&CODE=alerts">Alerts</a>
            <a href="?act=UserCP&CODE=50">Forums</a>
            <a href="?act=UserCP&CODE=26">Topics</a>
        </div></div>
        <div class="accordion--trigger" data-category="settings"><b>Settings</b></div>
        <div class="accordion--content" data-category="settings"><div class="accordion--inner">
            <a href="?act=UserCP&CODE=04">Board</a>
            <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
            <a href="?act=UserCP&CODE=02">Emails</a>
        </div></div>`;

const jcinkStoreLinks = `<div class="accordion--trigger" data-category="personal"><b>Personal</b></div>
        <div class="accordion--content" data-category="personal"><div class="accordion--inner">
            <a href="?act=store&CODE=inventory">Inventory</a>
            <a href="?act=store&code=donate_money">Send Money</a>
            <a href="?act=store&code=donate_item">Send Item</a>
        </div></div>
        <div class="accordion--trigger" data-category="shop"><b>Shop</b></div>
        <div class="accordion--content" data-category="shop"><div class="accordion--inner">
            <a href="?act=store">Home</a>
            <a href="?act=store&code=shop&category=1">Appreciation Badges</a>
            <a href="?act=store&code=shop&category=2">Player Badges</a>
            <a href="?act=store&code=shop&category=3">Premium Features</a>
            <a href="?act=store&code=shop&category=4">Trait Badges</a>
            <a href="?act=store&code=shop&category=5">Zodiac Badges</a>
        </div></div>
        <div class="accordion--trigger staffOnly" data-category="staff"><b>Staff</b></div>
        <div class="accordion--content staffOnly" data-category="staff"><div class="accordion--inner">
            <a href="?act=store&code=fine" class="staffOnly">Fine</a>
            <a href="?act=store&code=edit_points" class="staffOnly">Edit Points</a>
            <a href="?act=store&code=edit_inventory" class="staffOnly">Edit Inventory</a>
        </div></div>`;

const jcinkModCPLinks = `<div class="accordion--trigger" data-category="forumsposts"><b>Forums & Posts</b></div>
        <div class="accordion--content" data-category="forumsposts"><div class="accordion--inner">
            <a href="?act=modcp&CODE=queue">Queue</a>
            <a href="?act=modcp&CODE=reported">Reported</a>
            <a href="?act=modcp&CODE=modlogs">Logs</a>
            <a href="?act=modcp&CODE=prune">Prune</a>
        </div></div>
        <div class="accordion--trigger" data-category="users"><b>Users</b></div>
        <div class="accordion--content" data-category="users"><div class="accordion--inner">
            <a href="?act=modcp&CODE=members">Edit</a>
            <a href="?act=modcp&CODE=warnpanel">Warn</a>
            <a href="?act=modcp&CODE=warnlogs">Logs</a>
            <a href="?act=modcp&CODE=ip">IP Tools</a>
            <a href="?act=modcp&CODE=validating">Validation</a>
        </div></div>`;