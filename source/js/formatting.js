/***** General Formatting *****/
function formatTabLabelWrap(title, hash) {
    return `<tag-label class="tab-category accordion--trigger" data-category="${hash}">
        <span>${title}</span>
    </tag-label>
    <div class="tab-category accordion--content" data-category="${hash}"><div class="accordion--inner">`;
}
function closeTabLabelWrap() {
    return `</div></div>`;
}
function formatTabCategory(hash) {
    return `<tag-tab class="tab-category" data-category="${hash}">
        <tag-tabset>`;
}
function closeTabCategory() {
    return `</tag-tabset>
    </tag-tab>`;
}
function formatTabLabel(title, hash) {
    return `<a href="#${hash}">${title}</a>`;
}
function formatTab(hash, content) {
    return `<tag-tab data-key="#${hash}">
        <div class="webpage--content-inner">
            ${content}
        </div>
    </tag-tab>`;
}
function formatClaim(title, lines, group = null, link = null, classes = ``, filterAttributes = ``) {
    let html = ``;
    if(group) {
        html += `<div class="claim g-${group} ${classes}">`;
    } else {
        html += `<div class="claim ${classes}">`;
    }
    if(link) {
        html += `<a href="${link}" ${filterAttributes}>${title}</a>`;
    } else {
        html += `<b ${filterAttributes}>${title}</b>`;
    }
    lines.forEach(line => {
        html += `<span>${line}</span>`;
    })
    html += `</div>`;

    return html;
}
function formatHeader(title, level, align = ``, classes = ``) {
    return `<div class="h${level} fullWidth ${classes}" data-box-align="${align}">${title}</div>`;
}
function startAccordion(attributes) {
    return `<div class="accordion--content"><div ${attributes}>`;
}
function stopAccordion() {
    return `</div></div>`;
}

/***** Subplots *****/
function formatSubplots(plots, characters, reserves) {
    reserves = reserves.filter(item => checkActiveReserve(item.Timestamp) <= (defaultReserve + parseInt(item.Extension)));

    reserves = reserves.map(reserve => ({
        type: 'reserve',
        member: reserve.Member,
        role: reserve.Role,
        section: reserve.Section,
        plot: reserve.Plot,
        timestamp: reserve.Timestamp,
        extension: reserve.Extension,
    }));

    //parse character roles
    characters = characters
                    .filter(character => character.Roles && character.Roles !== '')
                    .map(character => ({
                        ...character,
                        Roles: JSON.parse(character.Roles),
                    }));
    let characterRoles = [...reserves];
    characters.forEach(character => {
        character.Roles.forEach(role => {
            characterRoles.push({
                type: 'claim',
                id: character.AccountID,
                character: character.Character,
                group: character.Group,
                groupID: character.GroupID,
                member: character.Member,
                parentID: character.ParentID,
                ...role
            });
        });
    });
    
    //sort plots
    plots.sort((a, b) => {
        if(parseInt(a.Priority) < parseInt(b.Priority)) {
            return -1;
        } else if(parseInt(a.Priority) > parseInt(b.Priority)) {
            return 1;
        } else if(a.Plot < b.Plot) {
            return -1;
        } else if(a.Plot > b.Plot) {
            return 1;
        } else {
            return 0;
        }
    });

    //set html
    let labels = ``, tabs = ``;

    plots.forEach((plot, i) => {
        labels += formatTabLabel(capitalize(plot.Plot), cleanText(plot.PlotID));
        tabs += formatTab(cleanText(plot.PlotID), formatPlotInfo(plot, characterRoles));
    });

    document.querySelector('.accordion--content[data-category="plots"] .accordion--inner').innerHTML = labels;
    document.querySelector('tag-tab[data-category="plots"] tag-tabset').innerHTML = tabs;
}
function formatPlotInfo(plot, characters) {
    let sections = JSON.parse(plot.Sections);
    let sectionsHTML = ``;

    sections.sort((a, b) => {
        if(parseInt(a.priority) < parseInt(b.priority)) {
            return -1;
        } else if(parseInt(a.priority) > parseInt(b.priority)) {
            return 1;
        } else if(a.title < b.title) {
            return -1;
        } else if(a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });

    sections.forEach(section => {
        sectionsHTML += formatPlotSection(section, characters, plot);
    });

    return `<div class="plot--overview">
        <h2 class="serif">${capitalize(plot.Plot, [' ', '-'])}</h2>
        ${plot.Overview}
    </div>
    ${sectionsHTML}`;
}
function formatPlotSection(section, characters, plot) {
    let rolesHTML = ``;

    section.roles.sort((a, b) => {
        if(parseInt(a.priority) < parseInt(b.priority)) {
            return -1;
        } else if(parseInt(a.priority) > parseInt(b.priority)) {
            return 1;
        } else if(a.role < b.role) {
            return -1;
        } else if(a.role > b.role) {
            return 1;
        } else {
            return 0;
        }
    });

    section.roles.forEach(role => {
        rolesHTML += formatPlotRole(role, characters, plot, section);
    });

    return `<div class="h4">${capitalize(section.title)}</div>
    <div class="plot--section-overview">${section.overview}</div>
    <div class="plot--roles" data-type="grid" data-gap="smsquare">${rolesHTML}</div>`;
}
function formatPlotRole(role, characters, plot, section) {
    let assignedCharacters = characters.filter(item => item.plot === plot.Plot && item.section === section.title && item.role === role.role);
    let claimsHTML = ``;

    assignedCharacters.sort((a, b) => {
        if(a.type < b.type) {
            return -1;
        } else if(a.type > b.type) {
            return 1;
        } else if(a.character < b.character) {
            return -1;
        } else if(a.character > b.character) {
            return 1;
        } else if(a.member < b.member) {
            return -1;
        } else if(a.member > b.member) {
            return 1;
        } else {
            return 0;
        }
    });

    assignedCharacters.forEach(character => {
        if(character.type === 'claim') {
            let lines = [`played by <a href="?showuser=${character.parentID}">${character.member}</a>`];
            claimsHTML += formatClaim(character.character, lines, character.groupID, `?showuser=${character.id}`);
        } else {
            let lines = [`Expires in <span class="highlight" data-expiry data-timestamp="${character.timestamp}" data-extension="${character.extension}">${setExpiry(character.timestamp, character.extension)}</span>`];
            claimsHTML += formatClaim(`Reserved by ${character.member}`, lines);
        }
    });

    if(assignedCharacters.length === 0) {
        claimsHTML = `<div class="claim fullWidth"><span>No active claims or reserves.</span></div>`;
    }

    return `<div class="h5 fullWidth" data-box-align="left">${capitalize(role.role)}</div>
    ${role.description && role.description !== '' && `<div class="plot--role-description fullWidth">${role.description}</div>`}
    ${claimsHTML}`;
}

/***** Face Reserves *****/
function formatFaceReserves(data) {
    let existing = staticClaims.map(item => item.Face);
    data = data.filter(item => checkActiveReserve(item.Timestamp) <= (defaultReserve + parseInt(item.Extension)) && !existing.includes(item.Reserve));

    data.sort((a, b) => {
        if(a.Reserve < b.Reserve) {
            return -1;
        } else if(a.Reserve > b.Reserve) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    data.forEach((item, i) => {
        let lines = [`Reserved for ${item.Member}`, `Expires in <span class="highlight" data-expiry data-timestamp="${item.Timestamp}" data-extension="${item.Extension}">${setExpiry(item.Timestamp, item.Extension)}</span>`];

        //first
        if(i === 0) {
            html += formatHeader(item.Reserve[0].toUpperCase(), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Reserve, lines);
        }

        //different starting letter
        else if (data[i - 1].Reserve[0] !== item.Reserve[0]) {
            html += `</div>`;
            html += formatHeader(item.Reserve[0].toUpperCase(), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Reserve, lines);
        }

        //same starting letter
        else {
            html += formatClaim(item.Reserve, lines);
        }

        //last
        if(i === data.length - 1) {
            html += `</div>`;
        }
    });


    document.querySelector('tag-tab[data-key="#face-reserves"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Deity Reserves *****/
function formatDeityReserves(data) {
    let existing = staticClaims.map(item => item.Character);
    data = data.filter(item => checkActiveReserve(item.Timestamp) <= (defaultReserve + parseInt(item.Extension)) && !existing.includes(item.Reserve.split(' of the ')[0]));

    data.sort((a, b) => {
        if(a.Reserve < b.Reserve) {
            return -1;
        } else if(a.Reserve > b.Reserve) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = formatHeader(`Deity Reserves`, 3);
    html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;

    data.forEach((item, i) => {
        let lines = [`Reserved for ${item.Member}`, `Expires in <span class="highlight" data-expiry data-timestamp="${item.Timestamp}" data-extension="${item.Extension}">${setExpiry(item.Timestamp, item.Extension)}</span>`];
        html += formatClaim(item.Reserve, lines);
    });
    html += `</div>`;

    document.querySelector('tag-tab[data-key="#deity-reserves"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Reincarnation Reserves *****/
function formatReincarnationReserves(data) {
    let existing = staticClaims.map(item => item.Reincarnation);
    data = data.filter(item => checkActiveReserve(item.Timestamp) <= (defaultReserve + parseInt(item.Extension)) && !existing.includes(item.Reserve));

    data.sort((a, b) => {
        if(a.Reserve < b.Reserve) {
            return -1;
        } else if(a.Reserve > b.Reserve) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = formatHeader(`Reincarnation Reserves`, 3);
    html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;

    data.forEach((item, i) => {
        let lines = [`Reserved for ${item.Member}`, `Expires in <span class="highlight" data-expiry data-timestamp="${item.Timestamp}" data-extension="${item.Extension}">${setExpiry(item.Timestamp, item.Extension)}</span>`];
        html += formatClaim(item.Reserve, lines);
    });
    html += `</div>`;

    document.querySelector('tag-tab[data-key="#reincarnation-reserves"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Canon Reserves *****/
function formatCanonReserves(data) {
    let existing = staticCanons.filter(item => item.Status !== 'open').map(item => item.Canon);
    data = data.filter(item => checkActiveReserve(item.Timestamp) <= (defaultReserve + parseInt(item.Extension)) && !existing.includes(item.Reserve));

    data.sort((a, b) => {
        if(a.Reserve < b.Reserve) {
            return -1;
        } else if(a.Reserve > b.Reserve) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = formatHeader(`Canon Reserves`, 3);
    html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;

    data.forEach((item, i) => {
        let lines = [`Reserved for ${item.Member}`, `Expires in <span class="highlight" data-expiry data-timestamp="${item.Timestamp}" data-extension="${item.Extension}">${setExpiry(item.Timestamp, item.Extension)}</span>`];
        html += formatClaim(item.Reserve, lines);
    });
    html += `</div>`;


    document.querySelector('tag-tab[data-key="#canon-reserves"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Face Claims *****/
function formatFaceClaims(data) {
    data.sort((a, b) => {
        if(a.Face < b.Face) {
            return -1;
        } else if(a.Face > b.Face) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    data.forEach((item, i) => {
        let lines = [`Representing <a href="?showuser=${item.AccountID}">${item.Character}</a>`, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];

        //first
        if(i === 0) {
            html += formatHeader(item.Face[0].toUpperCase(), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Face, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (data[i - 1].Face[0] !== item.Face[0]) {
            html += `</div>`;
            html += formatHeader(item.Face[0].toUpperCase(), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Face, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Face, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === data.length - 1) {
            html += `</div>`;
        }
    });


    document.querySelector('tag-tab[data-key="#faces"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Canons *****/
function formatCanons(data, reserves) {
    data = data.map(item => ({
        ...item,
        Details: JSON.parse(item.Details),
        Scales: JSON.parse(item.Scales),
    }));
    data.sort((a, b) => {
        if(a.Ancestry < b.Ancestry) {
            return -1;
        } else if(a.Ancestry > b.Ancestry) {
            return 1;
        } if(a.Details[0] < b.Details[0]) {
            return -1;
        } else if(a.Details[0] > b.Details[0]) {
            return 1;
        } else if(a.Canon < b.Canon) {
            return -1;
        } else if(a.Canon > b.Canon) {
            return 1;
        } else {
            return 0;
        }
    });

    let content = ``, labels = ``, activeReserves = [];
    reserves.forEach(reserve => {
        let difference = checkActiveReserve(reserve.Timestamp);
        if(difference < (defaultReserve + parseInt(reserve.Extension))) {
            activeReserves.push(reserve.Reserve);
        }
    });
    data.forEach(item => {
        if(item.Status === 'open' && activeReserves.includes(item.Canon)) {
            item.Status = 'reserved';
        }
    });

    data.forEach((item, i) => {
        let html = ``;
        let details = item.Details;
        let scales = item.Scales;
        let member = item.Status === 'claimed' ? JSON.parse(item.Member) : '';
        let infoFormatted = ``;
        if(item.Ancestry === 'creature') {
            infoFormatted = `<div class="canon--info">
                <div class="canon--stat">${item.Status !== 'claimed' ? `<b>Status</b>${item.Status}` : `<b>Played By</b><a href="?showuser=${member.id}">${member.alias}</a>`}</div>
                <div class="canon--stat"><b>${details[0]}</b>${details[1]}</div>
            </div>`;
        } else if(item.Ancestry === 'mortal') {
            infoFormatted = `<div class="canon--info">
                <div class="canon--stat">${item.Status !== 'claimed' ? `<b>Status</b>${item.Status}` : `<b>Played By</b><a href="?showuser=${member.id}">${member.alias}</a>`}</div>
                <div class="canon--stat"><b>${item.Ancestry}</b>${details.map(el => `<span>${el}</span>`).join('')}</div>
            </div>`;
        } else {
            infoFormatted = `<div class="canon--info">
                <div class="canon--stat">${item.Status !== 'claimed' ? `<b>Status</b>${item.Status}` : `<b>Played By</b><a href="?showuser=${member.id}">${member.alias}</a>`}</div>
                <div class="canon--stat"><b>pronouns</b>${item.Pronouns}</div>
                <div class="canon--stat"><b>${item.Ancestry}</b>${details[0]}</div>
            </div><div class="canon--info">
                <div class="canon--stat">${details[1]}</div>
            </div>`;
        }
        html += `<div class="canon" name="${cleanText(item.Canon)}">
            <div class="h2 serif">${capitalize(item.Canon)}</div>
            ${infoFormatted}
            <div class="species--sliders">
                <div class="profile--scale-item ${scales.recognition}" data-info="Would the average mortal recognize this character?">
                    <strong>Public Recognition</strong>
                    <div class="profile--scale"><span></span></div>
                </div>
                <div class="profile--scale-item ${scales.influence}" data-info="Does this character exert influence over the mortal world?">
                    <strong>Public Influence</strong>
                    <div class="profile--scale"><span></span></div>
                </div>
                <div class="profile--scale-item ${scales.ability}" data-info="Does this character have magic of their own?">
                    <strong>Magical Ability</strong>
                    <div class="profile--scale"><span></span></div>
                </div>
                <div class="profile--scale-item ${scales.strength}" data-info="Is this character's magic at full power?">
                    <strong>Magical Strength</strong>
                    <div class="profile--scale"><span></span></div>
                </div>
            </div>
            <div class="canon--body">
                ${item.Summary}
            </div>
        </div>`;

        if(i === 0) {
            labels += `<b>${item.Details[0].replace(' pantheon', ' gods')}</b><div class="menu--scroll">`;
        } else if (data[i - 1].Details[0] !== item.Details[0]) {
            labels += `</div><b>${item.Details[0].replace(' pantheon', ' gods')}</b><div class="menu--scroll">`;
        } else if(data.length === i - 1) {
            labels += `</div>`;
        }

        labels += formatTabLabel(item.Canon, cleanText(item.Canon));
        content += formatTab(cleanText(item.Canon), html);
    });

    document.querySelector('.accordion--content[data-category="canons"] .accordion--inner').insertAdjacentHTML('beforeend', labels);
    document.querySelector('.webpage--content [data-category="canons"] tag-tabset').insertAdjacentHTML('beforeend', content);
}

/***** Folklore *****/
function formatFolklore(data) {
    data = data.map(item => ({
        ...item,
        Folklore: JSON.parse(item.Folklore),
    }));
    let deityArray = data.filter(item => item.Folklore.type === 'deity'),
        heroArray = data.filter(item => item.Folklore.type === 'hero'),
        beastArray = data.filter(item => item.Folklore.type === 'creature' && item.Folklore.creatureType === 'beast'),
        spiritArray = data.filter(item => item.Folklore.type === 'creature' && item.Folklore.creatureType === 'spirit'),
        mortalArray = data.filter(item => item.Folklore.type === 'mortal'),
        deitiesHTML = formatDeities(deityArray),
        heroesHTML = formatHeroes(heroArray),
        beastsHTML = formatBeasts(beastArray),
        spiritsHTML = formatSpirits(spiritArray),
        mortalsHTML = formatMortals(mortalArray);

        document.querySelector('tag-tab[data-key="#deities"] .webpage--content-inner').insertAdjacentHTML('beforeend', deitiesHTML);
        document.querySelector('tag-tab[data-key="#heroes"] .webpage--content-inner').insertAdjacentHTML('beforeend', heroesHTML);
        document.querySelector('tag-tab[data-key="#beasts"] .webpage--content-inner').insertAdjacentHTML('beforeend', beastsHTML);
        document.querySelector('tag-tab[data-key="#spirits"] .webpage--content-inner').insertAdjacentHTML('beforeend', spiritsHTML);
        document.querySelector('tag-tab[data-key="#mortals"] .webpage--content-inner').insertAdjacentHTML('beforeend', mortalsHTML);
}
function formatDeities(data) {
    let html = ``;
    data.sort((a, b) => {
        if(a.Folklore.pantheon < b.Folklore.pantheon) {
            return -1;
        } else if(a.Folklore.pantheon > b.Folklore.pantheon) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    data.forEach((item, i) => {
        let lines = [`${item.Folklore.pantheon} Pantheon`, item.Folklore.domain, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];

        //first
        if(i === 0) {
            html += formatHeader(`${capitalize(item.Folklore.pantheon, [' ', '-'])} Pantheon`, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (data[i - 1].Folklore.pantheon !== item.Folklore.pantheon) {
            html += `</div>`;
            html += formatHeader(`${capitalize(item.Folklore.pantheon, [' ', '-'])} Pantheon`, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === data.length - 1) {
            html += `</div>`;
        }
    });
    return html;
}
function formatHeroes(data) {
    let html = ``;
    data.sort((a, b) => {
        if(a.Folklore.parent < b.Folklore.parent) {
            return -1;
        } else if(a.Folklore.parent > b.Folklore.parent) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    let born = data.filter(item => !item.Folklore.parent.includes('gifted'));
    let gifted = data.filter(item => item.Folklore.parent.includes('gifted'));
    let combined = [...born, ...gifted];
    combined.forEach((item, i) => {
        let lines = [item.Folklore.gifts, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];
        let title = item.Folklore.parent.includes('gifted')
                ? capitalize(item.Folklore.parent, [' ', '-'])
                : `Children of ${capitalize(item.Folklore.parent, [' ', '-'])}`;

        //first
        if(i === 0) {
            html += formatHeader(title, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (combined[i - 1].Folklore.parent !== item.Folklore.parent) {
            html += `</div>`;
            html += formatHeader(title, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === combined.length - 1) {
            html += `</div>`;
        }
    });
    return html;
}
function formatBeasts(data) {
    let html = ``;
    data.sort((a, b) => {
        if(a.Folklore.species < b.Folklore.species) {
            return -1;
        } else if(a.Folklore.species > b.Folklore.species) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    data.forEach((item, i) => {
        let lines = [];
        if(item.Folklore.subspecies && item.Folklore.subspecies !== '') {
            lines.push(item.Folklore.subspecies);
        }
        lines.push(`Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`);

        //first
        if(i === 0) {
            html += formatHeader(capitalize(item.Folklore.species, [' ', '-']), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (data[i - 1].Folklore.species !== item.Folklore.species) {
            html += `</div>`;
            html += formatHeader(capitalize(item.Folklore.species, [' ', '-']), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === data.length - 1) {
            html += `</div>`;
        }
    });
    return html;
}
function formatSpirits(data) {
    let html = ``;
    data.sort((a, b) => {
        if(a.Folklore.element < b.Folklore.element) {
            return -1;
        } else if(a.Folklore.element > b.Folklore.element) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    data.forEach((item, i) => {
        let lines = [item.Folklore.subtype, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];

        //first
        if(i === 0) {
            html += formatHeader(capitalize(item.Folklore.element, [' ', '-']), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (data[i - 1].Folklore.element !== item.Folklore.element) {
            html += `</div>`;
            html += formatHeader(capitalize(item.Folklore.element, [' ', '-']), 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === data.length - 1) {
            html += `</div>`;
        }
    });
    return html;
}
function formatMortals(data) {
    let html = ``;
    data.sort((a, b) => {
        if(a.Folklore.denomination < b.Folklore.denomination) {
            return -1;
        } else if(a.Folklore.denomination > b.Folklore.denomination) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });
    let worshipping = data.filter(item => item.Folklore.denomination !== 'non-worshipping');
    let nonWorshipping = data.filter(item => item.Folklore.denomination === 'non-worshipping');
    worshipping.forEach((item, i) => {
        let lines = [`Prays to ${item.Folklore.patron}`, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];

        //first
        if(i === 0) {
            html += formatHeader(`Worships the ${capitalize(item.Folklore.denomination, [' ', '-'])} Pantheon`, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //different starting letter
        else if (worshipping[i - 1].Folklore.denomination !== item.Folklore.denomination) {
            html += `</div>`;
            html += formatHeader(`Worships the ${capitalize(item.Folklore.denomination, [' ', '-'])} Pantheon`, 3);
            html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //same starting letter
        else {
            html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
        }

        //last
        if(i === worshipping.length - 1) {
            html += `</div>`;
        }
    });
    html += formatHeader(`Non-Worshipping`, 3);
    html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
    nonWorshipping.forEach(item => {
        let lines = [`Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];
        html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
    });
    html += `</div>`;
    return html;
}
function formatReincarnationClaims(data) {
    data.sort((a, b) => {
        if(a.Reincarnation < b.Reincarnation) {
            return -1;
        } else if(a.Reincarnation > b.Reincarnation) {
            return 1;
        } else if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = formatHeader(`Reincarnations`, 3);
    html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;

    data.forEach((item, i) => {
        let lines = [`Reborn as <a href="?showuser=${item.AccountID}">${item.Character}</a>`, `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`];
        html += formatClaim(item.Reincarnation, lines, item.GroupID, `?showuser=${item.AccountID}`);
    });
    html += `</div>`;


    document.querySelector('tag-tab[data-key="#reincarnations"] .webpage--content-inner').insertAdjacentHTML('beforeend', html);
}

/***** Member Directory *****/
function formatDirectory(data, claims) {
    let labels = ``, tabs = ``;

    data.sort((a, b) => {
        if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });
    
    data.forEach((item, i) => {
        labels += formatTabLabel(item.Member, cleanText(item.Member));
        tabs += formatTab(cleanText(item.Member), formatMemberInfo(item, claims));
    });

    document.querySelector('.accordion--content[data-category="members"] .accordion--inner').insertAdjacentHTML('beforeend', labels);
    document.querySelector('.webpage--content [data-category="members"] tag-tabset').insertAdjacentHTML('beforeend', tabs);
}
function formatMemberInfo(member, claims) {
    let characters = claims.filter(item => item.Member === member.Member);
    let ratings = JSON.parse(member.Ratings);
    let style = JSON.parse(member.Style);

    characters.sort((a, b) => {
        if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    let characterHTML = ``;
    characters.forEach(character => {
        let lines = [`Looks like ${character.Face}`, `Belongs in ${character.Group}`];
        characterHTML += formatClaim(character.Character, lines, character.GroupID, `?showuser=${character.AccountID}`);
    });

    return `<h2 class="serif">${capitalize(member.Member, [' ', '-'])}</h2>
    <div class="directory--info">
        <div class="directory--stat"><b>group</b>${member.Group}</div>
    </div>
    <div class="directory--info">
        <div class="directory--stat"><b>pronouns</b>${member.Pronouns}</div>
        <div class="directory--stat"><b>age</b>${member.Age}</div>
        <div class="directory--stat"><b>timezone</b>${member.Timezone}</div>
    </div>
    <div class="directory--info">
        <div class="directory--stat"><b>writes</b>${ratings.lang} - ${ratings.sex} - ${ratings.vio}</div>
        <div class="directory--stat"><b>style</b>${style.pov}, ${style.tense}</div>
    </div>
    <div class="directory--body" data-type="grid">
        <div class="directory--section">
            <div class="h5" data-box-align="left">About</div>
            <p>${member.About}</p>
        </div>
        <div class="directory--section">
            <div class="h5" data-box-align="left">Triggers</div>
            <p>${member.Triggers}</p>
        </div>
        <div class="directory--list" data-type="grid" data-gap="smsquare">
            <div class="h5 fullWidth" data-box-align="left">Active Characters</div>
            ${characterHTML}
        </div>
    </div>`;
}

/***** Businesses *****/
function formatBusinesses(data, claims) {
    claims = claims
                    .filter(character => character.Jobs && character.Jobs !== '')
                    .map(character => ({
                        ...character,
                        Jobs: JSON.parse(character.Jobs),
                    }));
    let employed = [];
    claims.forEach(character => {
        character.Jobs.forEach(job => {
            employed.push({
                id: character.AccountID,
                character: character.Character,
                group: character.Group,
                groupID: character.GroupID,
                member: character.Member,
                parentID: character.ParentID,
                ...job
            });
        });
    });

    data.sort((a, b) => {
        if (a.Category < b.Category) {
            return -1;
        } else if (a.Category > b.Category) {
            return 1;
        } else if (a.Employer.toLowerCase().trim().replace('the ', '') < b.Employer.toLowerCase().trim().replace('the ', '')) {
            return -1;
        } else if (a.Employer.toLowerCase().trim().replace('the ', '') > b.Employer.toLowerCase().trim().replace('the ', '')) {
            return 1;
        } else {
            return 0;
        }
    });

    let labels = ``, tabs = ``;
    data.forEach((item, i) => {
        //first
        if(i === 0) {
            labels += formatTabLabelWrap(item.Category, cleanText(item.Category));
            labels += formatTabLabel(item.Employer, cleanText(item.Employer));

            tabs += formatTabCategory(cleanText(item.Category));
            tabs += formatTab(cleanText(item.Employer), formatEmployer(item, employed));
        }

        //different category
        else if(data[i - 1].Category !== item.Category) {
            labels += closeTabLabelWrap();
            labels += formatTabLabelWrap(item.Category, cleanText(item.Category));
            labels += formatTabLabel(item.Employer, cleanText(item.Employer));

            tabs += closeTabCategory();
            tabs += formatTabCategory(cleanText(item.Category));
            tabs += formatTab(cleanText(item.Employer), formatEmployer(item, employed));
        }

        //different business
        else {
            labels += formatTabLabel(item.Employer, cleanText(item.Employer));
            tabs += formatTab(cleanText(item.Employer), formatEmployer(item, employed));
        }

        //last
        if(i === data.length - 1) {
            labels += closeTabLabelWrap();
            tabs += closeTabCategory();
        }
    });

    labels += formatTabLabelWrap('self-employed', cleanText('self-employed'));
    labels += formatTabLabel('self-employed', cleanText('self-employed'));
    labels += closeTabLabelWrap();

    tabs += formatTabCategory(cleanText('self-employed'));
    tabs += formatTab(cleanText('self-employed'), formatSelfEmployed(employed));
    tabs += closeTabCategory();

    document.querySelector('tag-labels.accordion').insertAdjacentHTML('beforeend', labels);
    document.querySelector('tag-tabset.webpage--content').innerHTML = tabs;
}
function formatEmployees(claims, employer) {
    let characters = claims.filter(item => item.employer === employer);
    let html = ``;

    characters = sortEmployees(characters);

    characters.forEach((character, i) => {
        let lines = [character.position, `Played by <a href="?showuser=${character.parentID}">${character.member}</a>`];

        //first
        if(i === 0) {
            html += character.section !== '' ? formatHeader(character.section, 7, 'left') : '';
            html += formatClaim(character.character, lines, character.groupID, `?showuser=${character.id}`, '', `data-employer="${character.employer}"`);
        }

        //new section
        else if(characters[i - 1].section !== character.section) {
            html += formatHeader(character.section, 7, 'left');
            html += formatClaim(character.character, lines, character.groupID, `?showuser=${character.id}`, '', `data-employer="${character.employer}"`);
        }

        //same section
        else {
            html += formatClaim(character.character, lines, character.groupID, `?showuser=${character.id}`, '', `data-employer="${character.employer}"`);
        }

    });

    return html;
}
function formatEmployer(employer, claims) {
    let hiringText = employer.Hiring === 'yes' ? 'Yes' : (employer.Hiring === 'no' ? 'No' : `Please ask <a href="?showuser=${JSON.parse(employer.Owner).id}">${JSON.parse(employer.Owner).alias}</a>`);
    
    let hoursHTML = ``;
    let hours = JSON.parse(employer.Hours);
    hours.forEach((hourset, i) => {
        if(hourset.range) {
            hoursHTML += `<b class="h7">${hourset.range}</b><span>${hourset.time}</span>`;
            if(i !== hours.length - 1) {
                hoursHTML += `<br>`;
            }
        } else {
            hoursHTML += `<span>${hourset.text}</span>`;
        }
    });

    let characterHTML = formatEmployees(claims, employer.Employer);

    return `<h2 class="serif">${capitalize(employer.Employer, [' ', '-'])}</h2>
    <div class="directory--info">
        <div class="directory--stat"><b>located in</b><a href="?showforum=${employer.LocationID}">${employer.Location}</a></div>
    </div>
    <div class="directory--info">
        <div class="directory--stat"><b>hiring?</b>${hiringText}</div>
    </div>
    ${employer.Wanted && employer.Wanted !== '' ? `<div class="directory--info">
        <div class="directory--stat"><b>learn more</b> <a href="${employer.Wanted}">wanted ad</a></div>
    </div>` : ``}
    <div class="directory--body" data-type="grid">
        <div class="employer--description">
            <div class="directory--section">
                <div class="h5" data-box-align="left">About</div>
                <p>${employer.Summary}</p>
            </div>
            <div class="directory--section">
                <div class="h5" data-box-align="left">Hours</div>
                <div class="hours">${hoursHTML}</div>
            </div>
        </div>
        <div class="directory--section">
            <div class="h5" data-box-align="left">Employees</div>
            <div class="claims--grid" data-type="grid" data-gap="md">${characterHTML}</div>
        </div>
    </div>`;
}
function formatSelfEmployed(employed) {
    let characterHTML = formatEmployees(employed, 'self-employed');

    return `<div class="directory--list" data-type="grid" data-gap="md">
        ${characterHTML}
    </div>`;
}
function sortEmployees(employees) {
    employees.sort((a, b) => {
        if(a.section < b.section) {
            return -1;
        } else if(a.section > b.section) {
            return 1;
        } else if (a.bumpOwner > b.bumpOwner) {
            return -1;
        } else if (a.bumpOwner < b.bumpOwner) {
            return 1;
        } else if (a.bumpLeader > b.bumpLeader) {
            return -1;
        } else if (a.bumpLeader < b.bumpLeader) {
            return 1;
        } else if (a.bumpHead > b.bumpHead) {
            return -1;
        } else if (a.bumpHead < b.bumpHead) {
            return 1;
        } else if (a.bumpChief > b.bumpChief) {
            return -1;
        } else if (a.bumpChief < b.bumpChief) {
            return 1;
        } else if (a.bumpManager > b.bumpManager) {
            return -1;
        } else if (a.bumpManager < b.bumpManager) {
            return 1;
        } else if (a.position < b.position) {
            return -1;
        } else if (a.position > b.position) {
            return 1;
        } else if (a.character < b.character) {
            return -1;
        } else if (a.character > b.character) {
            return 1;
        } else {
            return 0;
        }
    });

    return employees;
}
function filterBusinesses(e) {
    let searchValue = standardizeLower(e.value);
    let names = document.querySelectorAll(`.webpage--menu .accordion--content a`);
    let accordions = document.querySelectorAll(`.accordion--content`);
    let accordionTriggers = document.querySelectorAll(`.accordion--trigger`);
    let matches = [];
    if(searchValue !== '') {
        names.forEach(name => {
            let nameValue = standardizeLower(name.innerText);
            if (nameValue.indexOf(searchValue) > -1) {
                name.classList.remove('hidden');
                matches.push(name);
            } else {
                name.classList.add('hidden');
            }
        });
        if(matches.length > 0) {
            matches.forEach(match => {
                match.closest('.accordion--content').classList.add('is-active');
                match.closest('.accordion--content').previousElementSibling.classList.add('is-active');
            })
        }
    } else {
        names.forEach(name => name.classList.remove('hidden'));
        accordions.forEach(accordion => accordion.classList.remove('is-active'));
        accordionTriggers.forEach(trigger => trigger.classList.remove('is-active'));
    }
}
function filterEmployees(e) {
    let searchValue = standardizeLower(e.value);
    let names = document.querySelectorAll(`.webpage--content .claim > a`);
    let businesses = document.querySelectorAll(`.webpage--menu .accordion--content a`);
    let businessNames = Array.from(businesses).map(business => standardizeLower(business.innerText));
    let accordions = document.querySelectorAll(`.accordion--content`);
    let accordionTriggers = document.querySelectorAll(`.accordion--trigger`);
    let matches = [];
    businesses.forEach(business => business.classList.add('hidden'));
    if(searchValue !== '') {
        names.forEach(name => {
            let nameValue = standardizeLower(name.innerText);
            let employer = standardizeLower(name.dataset.employer);
            let index = businessNames.findIndex(business => business === employer);
            if (nameValue.indexOf(searchValue) > -1) {
                businesses[index].classList.remove('hidden');
                matches.push(businesses[index]);
            }
        });
        if(matches.length > 0) {
            matches.forEach(match => {
                match.closest('.accordion--content').classList.add('is-active');
                match.closest('.accordion--content').previousElementSibling.classList.add('is-active');
            })
        }
    } else {
        businesses.forEach(name => name.classList.remove('hidden'));
        accordions.forEach(accordion => accordion.classList.remove('is-active'));
        accordionTriggers.forEach(trigger => trigger.classList.remove('is-active'));
    }
}

/***** Format Addresses *****/
function formatAddresses(characters, businesses) {
    characters = characters.filter(item => item.Address && item.Address !== '').map(item => ({
        type: 'character',
        address: JSON.parse(item.Address),
        title: item.Character,
        id: item.AccountID,
        group: item.Group,
        groupID: item.GroupID,
    }));
    businesses = businesses.filter(item => item.Address && item.Address !== '').map(item => ({
        type: 'business',
        address: JSON.parse(item.Address),
        title: item.Employer,
    }));

    let addresses = [...characters, ...businesses];

    addresses.sort((a, b) => {
        if(a.address.region < b.address.region) {
            return -1;
        } else if(a.address.region > b.address.region) {
            return 1;
        } else if(a.address.neighbourhood < b.address.neighbourhood) {
            return -1;
        } else if(a.address.neighbourhood > b.address.neighbourhood) {
            return 1;
        } else if(a.address.street < b.address.street) {
            return -1;
        } else if(a.address.street > b.address.street) {
            return 1;
        } else if(parseInt(a.address.house) < parseInt(b.address.house)) {
            return -1;
        } else if(parseInt(a.address.house) > parseInt(b.address.house)) {
            return 1;
        } else if(parseInt(a.address.apartment) < parseInt(b.address.apartment)) {
            return -1;
        } else if(parseInt(a.address.apartment) > parseInt(b.address.apartment)) {
            return 1;
        } else if(a.type < b.type) {
            return -1;
        } else if(a.type > b.type) {
            return 1;
        } else if(a.title < b.title) {
            return -1;
        } else if(a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });

    let sectionedAddresses = {
        location1: addresses.filter(item => item.address.region === 'location 1'),
        location2: addresses.filter(item => item.address.region === 'location 2'),
    }
    let addressHTML = {
        location1: '',
        location2: '',
    }

    document.querySelectorAll('tag-tab[data-category="addresses"] [data-key]').forEach(tab => {
        if(tab.dataset.key !== '#lookup') {
            let region = tab.dataset.key.split('#')[1];
            sectionedAddresses[region].forEach((address, i) => {
                let lines = [`${address.address.apartment !== '' ? `${address.address.apartment}-` : ``}${address.address.house} ${capitalize(address.address.street).trim()}`];
                let neighbourhood = address.address.neighbourhood !== '' ? address.address.neighbourhood : 'elsewhere';
                //first
                if(i === 0) {
                    addressHTML[region] += `<div class="accordion neighbourhood-accordion">`; //open neighbourhood
                    addressHTML[region] += formatHeader(`<span>${capitalize(neighbourhood, [' ', '-'])}</span>`, 3, 'accordion--trigger neighbourhood-trigger');
                    addressHTML[region] += `<div class="accordion--content"><div class="accordion">`;
                    addressHTML[region] += formatHeader(capitalize(address.address.street, [' ', '-']), 5, 'accordion--trigger');
                    addressHTML[region] += `<div class="accordion--content"><div class="claims--grid" data-type="grid">`; //open claims
                    addressHTML[region] += formatClaim(address.title, lines, address.type === 'character' ? address.groupID : null, address.type === 'character' ? `?showuser=${address.id}` : `?act=Pages&kid=businesses#${cleanText(address.title)}`);
                }

                //new neighbourhood
                else if(sectionedAddresses[region][i - 1].address.neighbourhood !== address.address.neighbourhood) {
                    addressHTML[region] += `</div></div>`; //close claims
                    addressHTML[region] += `</div></div>`; //close street
                    addressHTML[region] += `</div>`; //close neighbourhood

                    addressHTML[region] += `<div class="accordion neighbourhood-accordion">`; //open neighbourhood
                    addressHTML[region] += formatHeader(`<span>${capitalize(neighbourhood, [' ', '-'])}</span>`, 3, 'accordion--trigger neighbourhood-trigger');
                    addressHTML[region] += `<div class="accordion--content"><div class="accordion">`;
                    addressHTML[region] += formatHeader(capitalize(address.address.street, [' ', '-']), 5, 'accordion--trigger');
                    addressHTML[region] += `<div class="accordion--content"><div class="claims--grid" data-type="grid">`; //open claims
                    addressHTML[region] += formatClaim(address.title, lines, address.type === 'character' ? address.groupID : null, address.type === 'character' ? `?showuser=${address.id}` : `?act=Pages&kid=businesses#${cleanText(address.title)}`);
                }

                //new street
                else if(sectionedAddresses[region][i - 1].address.street !== address.address.street) {
                    addressHTML[region] += `</div></div>`; //close claims
                    addressHTML[region] += `</div>`; //close street

                    addressHTML[region] += `<div class="accordion">`;
                    addressHTML[region] += formatHeader(capitalize(address.address.street, [' ', '-']), 5, 'accordion--trigger');
                    addressHTML[region] += `<div class="accordion--content"><div class="claims--grid" data-type="grid">`; //open claims
                    addressHTML[region] += formatClaim(address.title, lines, address.type === 'character' ? address.groupID : null, address.type === 'character' ? `?showuser=${address.id}` : `?act=Pages&kid=businesses#${cleanText(address.title)}`);
                }

                //otherwise
                else {
                    addressHTML[region] += formatClaim(address.title, lines, address.type === 'character' ? address.groupID : null, address.type === 'character' ? `?showuser=${address.id}` : `?act=Pages&kid=businesses#${cleanText(address.title)}`);
                }

                //last
                if(i === sectionedAddresses[region].length - 1) {
                    addressHTML[region] += `</div></div>`; //close claims
                    addressHTML[region] += `</div></div>`; //close street
                    addressHTML[region] += `</div>`; //close neighbourhood
                }
            });

            tab.querySelector('.webpage--content-inner').innerHTML = addressHTML[region];
        }
    });
}

/***** Format Connections *****/
function formatConnections(data) {
    data = data.filter(item => item.Connections && item.Connections !== '' && item.Status && item.Status === 'approved');
    
    let connections = [];
    data.forEach(item => {
        item.Connections = JSON.parse(item.Connections);
        item.Connections.forEach(connection => {
            connections.push({
                title: item.Character,
                link: `?showuser=${item.AccountID}`,
                group: item.GroupID,
                playedBy: `Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`,
                connection: connection,
            });
        });
    });

    let local = connections.filter(item => item.connection.type === 'local');
    let historical = connections.filter(item => item.connection.type === 'historical');

    formatLocalConnections(local);
    formatHistoryConnections(historical);
}
function formatLocalConnections(data) {
    let html = ``;

    data.sort((a, b) => {
        if(parseInt(a.connection.priority) < parseInt(b.connection.priority)) {
            return -1;
        } else if(parseInt(a.connection.priority) > parseInt(b.connection.priority)) {
            return 1;
        } else if(a.connection.subcategory < b.connection.subcategory) {
            return -1;
        } else if(a.connection.subcategory > b.connection.subcategory) {
            return 1;
        } else if(a.connection.category === 'local history' && b.connection.category === 'local history' && (a.connection.role < b.connection.role)) {
            return -1;
        } else if(a.connection.category === 'local history' && b.connection.category === 'local history' && (a.connection.role > b.connection.role)) {
            return 1;
        } else if(a.title < b.title) {
            return -1;
        } else if(a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });

    data.forEach((item, i) => {
        let lines = [`${item.connection.role}`, item.playedBy];

        if(i === 0) {
            html += `<div class="accordion neighbourhood-accordion">`;
            html += formatHeader(`<span>${capitalize(item.connection.category, [' ', '-'])}</span>`, '3', 'accordion--trigger neighbourhood-trigger');
            html += startAccordion(`class="accordion"`);
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //different category
        else if(data[i - 1].connection.category !== item.connection.category) {
            html += stopAccordion();
            html += stopAccordion();
            html += `</div>`;
            html += `<div class="accordion neighbourhood-accordion">`;
            html += formatHeader(`<span>${capitalize(item.connection.category, [' ', '-'])}</span>`, '3', 'accordion--trigger neighbourhood-trigger');
            html += startAccordion(`class="accordion"`);
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //different subcategory
        else if(data[i - 1].connection.subcategory !== item.connection.subcategory) {
            html += stopAccordion();
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //same sections
        else {
            html += formatClaim(item.title, lines, item.group, item.link);
        }

        if(data.length - 1 === i) {
            html += stopAccordion();
            html += stopAccordion();
            html += `</div>`;
        }
    });

    document.querySelector('tag-tab[data-key="#local"] .webpage--content-inner').innerHTML = html;
}
function formatHistoryConnections(data) {
    let html = ``;

    data.sort((a, b) => {
        if(parseInt(a.connection.priority) < parseInt(b.connection.priority)) {
            return -1;
        } else if(parseInt(a.connection.priority) > parseInt(b.connection.priority)) {
            return 1;
        } else if(a.connection.subcategory < b.connection.subcategory) {
            return -1;
        } else if(a.connection.subcategory > b.connection.subcategory) {
            return 1;
        } else if(a.connection.location < b.connection.location) {
            return -1;
        } else if(a.connection.location > b.connection.location) {
            return 1;
        } else if(a.title < b.title) {
            return -1;
        } else if(a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });

    data.forEach((item, i) => {
        let lines = [`${item.connection.role}`, item.playedBy];

        //first
        if(i === 0) {
            html += `<div class="accordion neighbourhood-accordion">`;
            html += formatHeader(`<span>${capitalize(item.connection.category, [' ', '-'])}</span>`, '3', 'accordion--trigger neighbourhood-trigger');
            html += startAccordion(`class="accordion"`);
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += item.connection.location !== '' ? formatHeader(item.connection.location, '7') : ``;
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //different category
        else if(data[i - 1].connection.category !== item.connection.category) {
            html += stopAccordion();
            html += stopAccordion();
            html += `</div>`;
            html += `<div class="accordion neighbourhood-accordion">`;
            html += formatHeader(`<span>${capitalize(item.connection.category, [' ', '-'])}</span>`, '3', 'accordion--trigger neighbourhood-trigger');
            html += startAccordion(`class="accordion"`);
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += item.connection.location !== '' ? formatHeader(item.connection.location, '7') : ``;
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //different subcategory
        else if(data[i - 1].connection.subcategory !== item.connection.subcategory) {
            html += stopAccordion();
            html += formatHeader(capitalize(item.connection.subcategory, [' ', '-']), '5', 'accordion--trigger');
            html += startAccordion(`data-type="grid" class="claims--grid"`);
            html += item.connection.location !== '' ? formatHeader(item.connection.location, '7') : ``;
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //different location
        else if(data[i - 1].connection.location !== item.connection.location) {
            html += item.connection.location !== '' ? formatHeader(item.connection.location, '7') : ``;
            html += formatClaim(item.title, lines, item.group, item.link);
        }
        //same sections
        else {
            html += formatClaim(item.title, lines, item.group, item.link);
        }

        if(data.length - 1 === i) {
            html += stopAccordion();
            html += stopAccordion();
            html += `</div>`;
        }
    });

    document.querySelector('tag-tab[data-key="#historical"] .webpage--content-inner').innerHTML = html;
}

/***** Format Species *****/
function formatAllSpecies(data) {
    data = data.map(item => ({
        ...item,
        Creature: item.Creature,
        Abilities: JSON.parse(item.Abilities),
        Subtypes: item.Subtypes && item.Subtypes !== '' ? JSON.parse(item.Subtypes) : '',
        Weaknesses: JSON.parse(item.Weaknesses),
        Scales: JSON.parse(item.Scales),
        Subspecies: JSON.parse(item.Subspecies),
    }));

    data.sort((a, b) => {
        if(a.Type === 'beast' && b.Type !== 'beast') {
            return -1;
        } else if(a.Type !== 'beast' && b.Type === 'beast') {
            return 1;
        } else if(a.Creature < b.Creature) {
            return -1;
        } else if(a.Creature > b.Creature) {
            return 1;
        } else {
            return 0;
        }
    });

    let labels = ``, tabs = ``;
    data.forEach((item, i) => {
        if(i === 0) {
            labels += `<b>Beasts</b><div class="menu--scroll">`;
        } else if (data[i - 1].Type === 'beast' && item.Type === 'spirit') {
            labels += `</div><b>Spirits</b><div class="menu--scroll">`;
        } else if(data.length === i - 1) {
            labels += `</div>`;
        }
        labels += formatTabLabel(item.Creature, cleanText(item.Creature));
        tabs += formatSingleSpecies(item);
    });

    document.querySelector(`.accordion--content[data-category="playable"] .accordion--inner`).innerHTML = labels;
    document.querySelector(`tag-tab[data-category="playable"] tag-tabset`).innerHTML = tabs;
}
function formatSingleSpecies(data) {
    let subspeciesHTML = `<div class="species--section accordion">
                            <div class="h5">Subspecies</div>`;
    data.Subspecies.forEach(item => {
        subspeciesHTML += formatSubspecies(item);
    });
    subspeciesHTML += `</div>`;

    if(data.Subspecies.length === 0) {
        subspeciesHTML = ``;
    }

    return `<tag-tab data-key="#${cleanText(data.Creature)}">
                <div class="webpage--content-inner species">
                    <h2 class="serif">${capitalize(data.Creature, [' ', '-'])}${data.Type === 'spirit' ? ' Spirit' : ''}</h2>
                    <div class="species--info">
                        <div class="species--stat"><b>Class</b>${capitalize(data.Type, [' ', '-'])}</div>
                        <div class="species--stat"><b>Lifespan</b>${data.Lifespan}</div>
                    </div>
                    ${data.Subtypes && data.Subtypes !== '' && data.Subtypes.length > 0 ? (`<div class="species--info"><div class="species--stat subtypes"><b>Subtypes</b>${data.Subtypes.join(', ')}</div></div>`) : ``}
                    <div class="species--sliders">
                        <div class="profile--scale-item ${data.Scales.perception}" data-info="Is public perception of this species positive?">
                            <strong>Public Perception</strong>
                            <div class="profile--scale"><span></span></div>
                        </div>
                        <div class="profile--scale-item ${data.Scales.trust}" data-info="Does the public generally trust this species?">
                            <strong>Public Trust</strong>
                            <div class="profile--scale"><span></span></div>
                        </div>
                        <div class="profile--scale-item ${data.Scales.presence}" data-info="Is this species frequently found living among mortals?">
                            <strong>Presence in Civilization</strong>
                            <div class="profile--scale"><span></span></div>
                        </div>
                        <div class="profile--scale-item ${data.Scales.knowledge}" data-info="Does the general public know a lot about this creature?">
                            <strong>Level of Knowledge</strong>
                            <div class="profile--scale"><span></span></div>
                        </div>
                    </div>
                    <div class="species--grid">
                        <div class="species--section">
                            <div class="h5">Overview</div>
                            <p>${data.Overview}</p>
                        </div>
                        <div class="species--section">
                            <div class="h5">Physiology</div>
                            <p>${data.Physiology}</p>
                        </div>
                        <div data-type="grid" data-columns="2">
                            <div class="species--section">
                                <div class="h5">Abilities</div>
                                <p><ul>${data.Abilities.map(item => `<li>${item}</li>`).join('')}</ul></p>
                            </div>
                            <div class="species--section">
                                <div class="h5">Weaknesses</div>
                                <p><ul>${data.Weaknesses.map(item => `<li>${item}</li>`).join('')}</ul></p>
                            </div>
                        </div>
                        ${subspeciesHTML}
                    </div>
                </div>
            </tag-tab>`;
}
function formatSubspecies(data) {
    return `<div class="species--subsection accordion">
        <div class="h7 accordion--trigger">${data.type}</div>
        <div class="accordion--content"><div class="accordion--inner">${data.about}</div></div>
    </div>`;
}

/***** Format Key Locations *****/
function formatAllLocations(data) {
    let keyLocations = data.filter(item => !item.Quarter || item.Quarter === '');
    let neighbourhoods = data.filter(item => item.Quarter && item.Quarter !== '');

    neighbourhoods.sort((a, b) => {
        if(a.Quarter < b.Quarter) {
            return -1;
        } else if(a.Quarter > b.Quarter) {
            return 1;
        } else if(a.Board !== '' && b.Board === '') {
            return -1;
        } else if(a.Board === '' && b.Board !== '') {
            return 1;
        } else if(a.Location < b.Location) {
            return -1;
        } else if(a.Location > b.Location) {
            return 1;
        } else {
            return 0;
        }
    });

    keyLocations.sort((a, b) => {
        if(a.Location < b.Location) {
            return -1;
        } else if(a.Location > b.Location) {
            return 1;
        } else {
            return 0;
        }
    });

    let neighbourhoodsHTML = ``, locationsHTML = ``;
    neighbourhoods.forEach((item, i) => {
        if(i === 0) {
            neighbourhoodsHTML += `<div class="location">`;
            neighbourhoodsHTML += formatQuarterTopper(item);
            neighbourhoodsHTML += `<div class="accordion">`;
        } else if (neighbourhoods[i - 1].Quarter !== item.Quarter) {
            neighbourhoodsHTML += `</div></div></div>`;
            neighbourhoodsHTML += `<div class="location">`;
            neighbourhoodsHTML += formatQuarterTopper(item);
            neighbourhoodsHTML += `<div class="accordion">`;
        } else {
            neighbourhoodsHTML += formatQuarterLocation(item);
        }
        if(neighbourhoods.length === i - 1) {
            neighbourhoodsHTML += `</div></div></div>`;
        }
    });
    keyLocations.forEach(item => {
        
        locationsHTML += formatKeyLocation(item);
    });
    document.querySelector('.clip-neighbourhoods').innerHTML = neighbourhoodsHTML;
    document.querySelector('.clip-locations').innerHTML = locationsHTML;
}
function formatKeyLocation(data) {
    return `<div class="location">
        <div class="location--image"><img src="${data.Image}" loading="lazy" /></div>
        <div class="location--main accordion">
            <div class="location--title">${data.Location}</div>
            <div class="location--info">Located in ${data.Board === 'downtown elysium' ? '' : 'the '}<a href="?showforum=${data.BoardID}">${data.Board}</a></div>
            <div class="location--description">
                <div class="scroll">${data.Description}</div>
            </div>
        </div>
    </div>`;
}
function formatQuarterTopper(data) {
    return `<div class="location--image"><img src="${data.Image}" loading="lazy" /></div>
        <div class="location--main">
            <div class="location--title">${data.Location}</div>
            <div class="location--info">Visit the <a href="?showforum=${data.BoardID}">${data.Board}</a></div>
            <div class="location--description">
                <div class="scroll">${data.Description}</div>
            </div>`;
}
function formatQuarterLocation(data) {
    return `<div class="accordion--trigger h7">${data.Location}</div>
    <div class="accordion--content"><div class="accordion--inner">
        <blockquote>${data.Description}</blockquote>
    </div></div>`;
}

/***** Format Groups *****/
function formatAllGroups(data) {
    data.sort((a, b) => {
        if(a.Group < b.Group) {
            return -1;
        } else if(a.Group > b.Group) {
            return 1;
        } else {
            return 0;
        }
    });
    
    let free = ``, premium = ``, palette = `<div class="g-4 palette">Writer</div>`, text = `<div class="g-4 text">Writer</div>`;
    data.forEach(item => {
        palette += `<div class="g-${item.GroupID} palette">${item.Group}</div>`;
        text += `<div class="g-${item.GroupID} text">${item.Group}</div>`;

        if(item.Type === 'free') {
            free += formatSingleGroup(item);
        } else {
            premium += formatSingleGroup(item);
        }
    });
    document.querySelector('.clip-free-groups').innerHTML = free;
    document.querySelector('.clip-premium-groups').innerHTML = premium;
    if(document.querySelector('.clip-colors')) {
        document.querySelector('.clip-colors').innerHTML = `<div class="color-test swatches">${palette}</div><div class="color-test written">${text}</div>`;
    }
}
function formatSingleGroup(data) {
    const colorArray = data.Color.split(', ').map(item => parseInt(item));
    return `<div class="group g-${data.GroupID} ${data.Hidden === 'yes' ? 'staffOnly' : ''}">
        <div class="group--images">${JSON.parse(data.Images).map(item => `<img src="${item}" loading="lazy" />`).join('')}</div>
        <div class="group--main">
            <div class="group--title">${data.Group}</div>
            <div class="group--info">
                <span>#${rgbToHex(colorArray[0], colorArray[1], colorArray[2])}</span>
                <span>RGB(${data.Color})</span>
                <span>HSL(${rgbToHsl(colorArray[0], colorArray[1], colorArray[2])})</span>
            </div>
            <div class="group--description">
                <div class="scroll">${data.Description}</div>
            </div>
        </div>
    </div>`;
}