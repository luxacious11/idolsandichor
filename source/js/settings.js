const discordChannels = [
	{title: `#channel`, hook: `hook`},
];

const discordTags = [
    {alias: `Name`, id: `ID`},
];

const discordRoles = [
    {title: `Open`, id: `&ID`},
];

const staffDiscordRole = `ID`;

const uploads = `uploads2`;
const siteName = `idolsandichor`;
const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const defaultSquare = 'https://picsum.photos/250';
const checkboxChecked = `<i class="fa-light fa-sharp fa-xmark"></i>`;

const colors = {
    'group name': [0, 0, 0],
}

const unusable = ['premium group', 'custom complex event', 'custom discord role & icon', 'custom event', 'custom subplot'];

const staffGroups = ['4'];
const oocGroups = [...staffGroups, '6'];
const optGroups = ['1', '3', '5'];

const templateWraps = `tag-wrap`;

const markdownSafe = `.markdown, .postcolor.no-template, .postcolor blockquote, .postcolor [data-markdown]`;

const bbcode = [
    {
        groupName: "Text",
        extraClasses: "fullWidth",
        tags: [
            {
                tag: "h2",
                type: "simple",
                displayName: "H2"
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
                tag: "post",
                desc: "Use a basic post template; option 1",
                type: "complex",
                displayName: "Post 1 Wrap",
                complexIndicator: "theme number"
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
                tag: "profile",
                type: "simple",
                displayName: "Profile"
            },
            {
                tag: "displayname",
                type: "simple",
                displayName: "Display Name"
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
                tag: "caption",
                type: "simple",
                displayName: "Caption"
            },
            {
                tag: "alert",
                type: "simple",
                displayName: "Alert"
            },
        ]
    },
    {
        groupName: "Dev",
        extraClasses: 'fullWidth',
        tags: [
            {
                tag: "image",
                desc: "",
                type: "simple"
            },
            {
                tag: "simplequote",
                desc: "",
                type: "simple",
                displayName: "Simple Quote",
                simpleIndicator: "quote"
            },
            {
                tag: "sourcequote",
                desc: "",
                type: "complex",
                displayName: "Sourced Quote",
                simpleIndicator: "quote",
                complexIndicator: "source"
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
                tag: "spotify",
                desc: "",
                type: "simple"
            },
        ]
    },
    {
        groupName: "Groups",
        extraClasses: 'fullWidth',
        tags: [
            {
                tag: "GroupName",
                desc: "",
                type: "simple"
            },
        ]
    },
];

/** auto-tracker code by FizzyElf - https://fizzyelf.jcink.net **/
//these are the category and forum ids for a profile-based thread autotracker by fizzyelf
trackerParams = {
    //include
    includeCategoryIds: [],
    includeForumIds: [],
    ignoreForumIds: [],

    //define au, comm, dev, archive forums
    historyForumIds: [], //history
    commForumIds: [], //comm
    commHistoryForumIds: [], //comm history
    socialForumIds: [], //social
    socialHistoryForumIds: [], //social history
    devForumIds: [], //dev
    devHistoryForumIds: [], //dev history
    reqForumIds: [], //requests
    reqHistoryForumIds: [], //request history
    eventForumIds: [], //events
    eventHistoryForumIds: [], //event history
}

const fullWidthFields = [1, 11, 47, 14, 25, 26, 31, 32, 41, 42, 43, 44, 45, 46];
const thirdWidthFields = [6, 7, 8, 17, 18, 19];
const setHeightFields = [15, 16, 36];
const requiredFields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48,49, 50, 51, 52, 53, 54, 55, 62];

//toggle fields: account type, image type
const toggleFields = createFieldArray([1, 26, 31], true);
const memberFields = createFieldArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
const memberInputs = createFieldArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], true);
const characterFields = createFieldArray([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61]);
const deityFields = createFieldArray([27, 28]);
const heroFields = createFieldArray([29, 30]);
const creatureFields = createFieldArray([31]);
const beastFields = createFieldArray([32]);
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
    {
        sectionTitle: `Images`,
        insertBefore: 47,
        sectionDescription: ``,
    },
];
const memHeaders = [
    {
        sectionTitle: `Player`,
        insertBefore: 2,
        sectionDescription: `<p>All member fields are <u>mandatory</u>. Once filled out, the button at the bottom of the page will change and allow submission of the information to the Google Sheet that pulls the data into all your profiles. This allows you to only need to update your information on one account when something changes- and it will change across all of them within minutes!<p>`,
    },
];
const charHeaders = [
    {
        sectionTitle: `Basics`,
        insertBefore: 14,
        sectionDescription: `<p>All required fields are marked with an asterisk. Optional fields will hide on your profile if not filled out, so please leave them blank. Content warnings are not marked as required - however, if your profile contains triggering material, consider this field required anyway.</p>`,
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
<pre><textarea class="scroll">&lt;tag-relheader&gt;Content&lt;/tag-relheader&gt;</textarea></pre>
</tag-code>
</div></div>

<div class="h7 accordion--trigger">Relationships - Not Linked</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button>
<pre><textarea class="scroll">&lt;tag-rel&gt;&lt;b&gt;Name&lt;/b&gt;
&lt;span&gt;Content (Can be a block of text or a list)&lt;/span&gt;&lt;/tag-rel&gt;</textarea></pre>
</tag-code>
</div></div>

<div class="h7 accordion--trigger">Relationships - Linked</div>
<div class="accordion--content"><div class="accordion--inner">
<tag-code class="custom-code"><button type="button" onclick="highlightCode()" class="copyQuick">copy</button>
<pre><textarea class="scroll">&lt;tag-rel&gt;&lt;a href="url"&gt;Name&lt;/a&gt;
&lt;span&gt;Content (Can be a block of text or a list)&lt;/span&gt;&lt;/tag-rel&gt;</textarea></pre>
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
        sectionTitle: `Links`,
        insertBefore: 56,
        sectionDescription: `<p>These are for optional links to further information/resources for your character! Some things you might include here are links to your development forum/threads, links to playlists, or even to a Pinterest board you've put together. You can even place wanted ads here! Please leave these fields blank if you do not want to use them, and please keep the titles on the shorter side- 1 to 2 words each.</p>`,
    },
];


const sheetID = '1L8s1OSFgQYAOfKDib_JRKN-e-7bOgAF-_zu-XOX03mM';
const deployID = 'AKfycbzMs3nRGv80YK4xuSEDI31Xu_H-J-kB7jGAZCALZaBP-Q19SsA5dZLfa2iT9VKByH1oDA';

const reserveLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const businessLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const claimLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const modLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const staffLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const sortLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;
const announceLogs = `1378388518476451921/x-9GaKmB51pkkqvIhsKRA-yMpDzVvi0Yc73vkr9lKx28OnOcyYB6FGix9H2SY0EfqZ-m`;

//if using the base set up, these won't need to change
const claims = `https://opensheet.elk.sh/${sheetID}/Claims`;
const faceReserves = `https://opensheet.elk.sh/${sheetID}/FaceReserves`;
const plotReserves = `https://opensheet.elk.sh/${sheetID}/PlotReserves`;
const members = `https://opensheet.elk.sh/${sheetID}/Members`;
const plots = `https://opensheet.elk.sh/${sheetID}/Plots`;
const businesses = `https://opensheet.elk.sh/${sheetID}/Businesses`;
const groups = `https://opensheet.elk.sh/${sheetID}/Groups`;
const locations = `https://opensheet.elk.sh/${sheetID}/Locations`;
const creatures = `https://opensheet.elk.sh/${sheetID}/Creatures`;

const defaultReserve = 14;
const successMessage = `<blockquote class="fullWidth">Submission successful!</blockquote>
<button onclick="reloadForm(this)" type="button" class="fullWidth submit">Back to form</button>`;
const activeResExists = `<blockquote class="fullWidth warning">Uh-oh! That's already reserved. Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
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
            <a href="?act=store&code=shop&category=000">Category</a>
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