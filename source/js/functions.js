/***** Profile *****/
function formatAesthetics(images) {
    let imageHTML = ``;
    images.forEach((image, i) => {
        imageHTML += `<img src="${image}" title="Aesthetic Image #${i + 1}" alt="Aesthetic Image #${i + 1}" loading="lazy" />`;
    })
    return imageHTML;
}
function setRoster() {   
    let alphaChars = Alpha(document.querySelectorAll('select[name=showuser] option'));
    alphaChars.forEach(character => {
        let imageDiv = createAvatars('switch--image', character.account, attributes = ``);

        let html = `<a class="switch--block" href="?showuser=${character.account}">
            ${imageDiv}
            <span class="switch--name">${formatName(capitalize(character.character))}</span>
        </a>`;

        document.querySelector('.profile--roster').insertAdjacentHTML('beforeend', html);
    });
}
function initProfile(type, data, id, avatar, posts, money, awards) {
    let tab = document.querySelector('.profile--slide[data-tab="player"]');

    let leftColumn = ``;
    if(type === 'member') {
        leftColumn = `<div class="container"><div class="scroll"><div class="profile--roster"></div></div></div>`;
    } else {
        leftColumn = `<img src="${avatar}" loading="lazy" />`;
    }

    if(data.length > 0) {
        data = data.filter(item => item.AccountID === id);
        if(data.length > 0) {
            data = data.map(item => ({
                ...item,
                Ratings: JSON.parse(item.Ratings),
                Style: JSON.parse(item.Style)
            }))[0];
            if(type === 'character') {
                document.querySelector('.profile--page[data-tab="player"] > span').innerHTML = data.Member;
            }
            tab.innerHTML = `<div class="profile--tab">
                <div class="profile--tab-title">
                    <div class="h2">${data.Member}</div>
                    <div class="profile--tab-title-sub links">
                        <span>${data.Pronouns}</span>
                        <span>${data.Age}</span>
                        <span>${data.Timezone}</span>
                    </div>
                </div>
                <div class="profile--tab-inner">
                    <div class="profile--tab-column">
                        ${leftColumn}
                    </div>
                    <div class="profile--tab-column">
                        <div class="container">
                            <div class="scroll">
                                <div class="items">
                                    <div class="items--item">
                                        <b>Comfort Zone</b>
                                        <span>
                                            <span><u>L</u><lang-clip>${data.Ratings.lang}</lang-clip></span>
                                            <span><u>S</u><sex-clip>${data.Ratings.sex}</sex-clip></span>
                                            <span><u>V</u><vio-clip>${data.Ratings.vio}</vio-clip></span>
                                        </span>
                                    </div>
                                    <div class="items--item">
                                        <b>Style</b>
                                        <span>${data.Style.pov}, ${data.Style.tense}</span>
                                    </div>
                                    <div class="items--item">
                                        <b>Writes</b>
                                        <span>${data.Frequency}</span>
                                    </div>
                                    <div class="items--item">
                                        <b>Stats</b>
                                        <span>${posts} Posts, $${money}</span>
                                    </div>
                                    <div class="items--item">
                                        <b>Please Avoid</b>
                                        <span>${data.Triggers}</span>
                                    </div>
                                    <div class="items--item">
                                        <b>Awards</b>
                                        <span class="awards">${awards}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
            if(type === 'character') {
                document.querySelector('.profile--page[data-tab="player"] > span').innerHTML = `Pending`;
            }
            tab.innerHTML = `<div class="profile--tab">
                <div class="profile--tab-title">
                    <div class="h2">Pending</div>
                </div>
                <div class="profile--tab-inner">
                    <div class="profile--tab-column">
                        ${leftColumn}
                    </div>
                    <div class="profile--tab-column">
                        <div class="container">
                            <div class="scroll">
                                Member data pending
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    } else {
        if(type === 'character') {
            document.querySelector('.profile--page[data-tab="player"] > span').innerHTML = `Pending`;
        }
        tab.innerHTML = `<div class="profile--tab">
            <div class="profile--tab-title">
                <div class="h2">Pending</div>
            </div>
            <div class="profile--tab-inner">
                <div class="profile--tab-column">
                    ${leftColumn}
                </div>
                <div class="profile--tab-column">
                    <div class="container">
                        <div class="scroll">
                            Member data pending
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
function initCharacter(images, overflow, title, birthday, speciality, isLocal = false) {
    document.querySelector('.profile--header h1').innerHTML = formatHeroName(capitalize(title));

    //remove member sections
    document.querySelectorAll('.memAccOnly').forEach(item => item.remove());

    //set up aesthetics
    document.querySelector('.profile--aesthetics.top-left').innerHTML = formatAesthetics(images.splice(4, 7));
    document.querySelector('.profile--aesthetics.bottom-right').innerHTML = formatAesthetics(images.splice(0, 4));

    //set up age & birthday
    document.querySelector('age-clip').innerText = calculateAge(birthday);
    if (parseInt(birthday.year) < 0) {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year) * -1} BC`;
    } else {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year)}`;
    }

    //Freeform Overflow
    if(overflow !== `` && overflow !== `<i>No Information</i>`) {
        document.querySelector('.freeform .scroll').insertAdjacentHTML('beforeend', overflow);
    }

    //Specialty Fields
    if(speciality) {
        let preceding = document.querySelector('.clip-specialty-fields');
        let html = `<div class="items--item ${speciality.field1.optional ? 'optional' : ''}">
                <b>${speciality.field1.title}</b>
                <span>${speciality.field1.value}</span>
            </div>
            <div class="items--item ${speciality.field2.optional ? 'optional' : ''}">
                <b>${speciality.field2.title}</b>
                <span>${speciality.field2.value}</span>
            </div>`;
        preceding.insertAdjacentHTML('afterend', html);
    }

    //Tracker
    initAccordion();
    if(!isLocal) {
        FillTracker(title, trackerParams);
    }

    initHashCarousel('intro', '.profile--progress-bar');
}
function initMember() {
    //remove character only sections
    document.querySelectorAll('.charOnly').forEach(item => item.remove());

    //subaccounts list
    setRoster();
}
function formatProfilePlayer(member) {
    return `<div class="profile--column">
                <div class="items--title charOnly">played by</div>
                <div class="items--title memAccOnly">about</div>
                <div class="items scroll grid">
                    <div class="items--item">
                        <strong>alias</strong>
                        <span>${capitalize(member.Member, [' ', '-'])}</span>
                    </div>
                    <div class="items--item optional">
                        <strong>pronouns</strong>
                        <span>${capitalize(member.Pronouns, ['/'])}</span>
                    </div>
                    <div class="items--item">
                        <strong>Age</strong>
                        <span>${member.Age} years old</span>
                    </div>
                    <div class="items--item">
                        <strong>Timezone</strong>
                        <span>${member.Timezone.toUpperCase()}</span>
                    </div>
                    <div class="items--item">
                        <strong>Mature Content?</strong>
                        <span>${capitalize(member.Mature, [' '])}</span>
                    </div>
                    <div class="items--item">
                        <strong>Writing Style</strong>
                        <span>${capitalize(member.POV, [' '])}, ${capitalize(member.Tense, [' '])}</span>
                    </div>
                    <div class="items--item fullWidth">
                        <strong>Triggers</strong>
                        <span>${member.Triggers}</span>
                    </div>
                </div>
            </div>
            <img src="${member.Image}" loading="lazy" class="charOnly" />
            <div class="profile--column memAccOnly">
                <div class="scroll profile--roster"></div>
            </div>`;
}
function submitMemberData(e) {
    e.innerHTML = 'Submitting...';

    let form = document.querySelector('#ucpcontent form'),
        accountId = document.querySelector('body').dataset.accountId,
        alias = form.querySelector('#field_2_input'),
        pronouns = form.querySelector('#field_3_input'),
        age = form.querySelector('#field_4_input'),
        timezone = form.querySelector('#field_5_input'),
        language = form.querySelector('#field_6_input'),
        sexual = form.querySelector('#field_7_input'),
        violence = form.querySelector('#field_8_input'),
        pov = form.querySelector('#field_9_input'),
        tense = form.querySelector('#field_10_input'),
        activity = form.querySelector('#field_11_input'),
        intro = form.querySelector('#field_12_input'),
        triggers = form.querySelector('#field_13_input');

    let sheetData = {
        SubmissionType: `edit-member`,
        Member: getStandardValue(alias),
        Pronouns: getStandardValue(pronouns),
        Age: getValue(age),
        Timezone: getStandardValue(timezone),
        About: getValue(intro),
        Triggers: getValue(triggers),
        Ratings: JSON.stringify({
            lang: getSelectValue(language),
            sex: getSelectValue(sexual),
            vio: getSelectValue(violence)
        }),
        Style: JSON.stringify({
            pov: getSelectText(pov),
            tense: getSelectText(tense)
        }),
        Frequency: getSelectText(activity),
    }

    fetch(members)
    .then((response) => response.json())
    .then((data) => {
        let existing = data.filter(item => item.AccountID === accountId);
        if(existing.length) {
            sheetData.SubmissionType = 'edit-member';
            editMember(existing[0], sheetData);
        } else {
            sheetData.SubmissionType = 'add-member';
            sheetData.AccountID = accountId;
            sheetData.Group = 'writer';
            sheetData.GroupID = '6';

            let staffDiscord = {
                title: `New Member Data Added: ${capitalize(sheetData.Member, [' ', '-'])}`,
                text: `No action required at this time.`,
                hook: claimLogs,
            }

            sendAjax(null, sheetData, staffDiscord);
        }
    });
}
function editMember(existing, data) {
    let original = {...existing};
    let initialMessage = ``, changeMessage = ``;

    if(data.Alias !== original.Alias) {
        existing.Member = data.Alias;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Alias:** ${capitalize(original.Member, [' ', '-'])}`;
        changeMessage += `**Alias:** ${capitalize(existing.Member, [' ', '-'])}`;
    }

    if(data.Pronouns !== original.Pronouns) {
        existing.Pronouns = data.Pronouns;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Pronouns:** ${original.Pronoun}`;
        changeMessage += `**Pronouns:** ${existing.Pronouns}`;
    }

    if(data.Age !== original.Age) {
        existing.Age = data.Age;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Age:** ${original.Age}`;
        changeMessage += `**Age:** ${existing.Age}`;
    }

    if(data.Timezone !== original.Timezone) {
        existing.Timezone = data.Timezone;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Timezone:** ${original.Timezone}`;
        changeMessage += `**Timezone:** ${existing.Timezone}`;
    }

    if(data.Frequency !== original.Frequency) {
        existing.Frequency = data.Frequency;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Frequency:** ${original.Frequency}`;
        changeMessage += `**Frequency:** ${existing.Frequency}`;
    }

    if(data.Ratings !== original.Ratings) {
        existing.Ratings = data.Ratings;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        let originalRatings = JSON.parse(original.Ratings);
        let newRatings = JSON.parse(existing.Ratings);
        initialMessage += `**Ratings:** ${originalRatings.lang}-${originalRatings.sex}-${originalRatings.vio}`;
        changeMessage += `**Ratings:** ${newRatings.lang}-${newRatings.sex}-${newRatings.vio}`;
    }

    if(data.Style !== original.Style) {
        existing.Style = data.Style;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        let originalStyle = JSON.parse(original.Style);
        let newStyle = JSON.parse(existing.Style);
        initialMessage += `**Style:** ${originalStyle.pov}, ${originalStyle.tense}`;
        changeMessage += `**Style:** ${newStyle.pov}, ${newStyle.tense}`;
    }

    if(data.About !== original.About) {
        existing.About = data.About;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Intro:**
        > ${original.About}\n`;
        changeMessage += `**Intro:**
        > ${existing.About}\n`;
    }

    if(data.Triggers !== original.Triggers) {
        existing.Triggers = data.Triggers;
        if(initialMessage !== '') {
            initialMessage += `\n`;
            changeMessage += `\n`;
        }
        initialMessage += `**Triggers:**
        > ${original.Triggers}\n`;
        changeMessage += `**Triggers:**
        > ${existing.Triggers}\n`;
    }

    let staffDiscord = {
        title: `Member Claims Editted: ${capitalize(original.Member, [' ', '-'])}`,
        text: `Initial Values
        ----------
        ${initialMessage}
        
        New Values
        ----------
        ${changeMessage}`,
        hook: claimLogs,
    }

    existing.SubmissionType = data.SubmissionType;

    sendAjax(null, existing, staffDiscord);
}

/****** UserCP/Messages ******/
function cpShift() {
	let creatureType = document.querySelector(toggleFields[2]).value,
        characterType = document.querySelector(toggleFields[1]).value,
	    account = document.querySelector(toggleFields[0]).value,
	    showFields = [],
	    hideFields = [...characterFields, ...memberFields, ...deityFields, ...heroFields, ...creatureFields, ...spiritFields, ...beastFields, ...mortalFields],
	    showHeaders = allHeaders;

	if(account.toLowerCase() == 'character') {
        showHeaders = [...allHeaders, ...charHeaders];
        showFields = [...characterFields];
        hideFields = [...memberFields];

        if(characterType.toLowerCase() === 'deity') {
            showFields = [...showFields, ...deityFields];
            hideFields = [...hideFields, ...heroFields, ...creatureFields, ...mortalFields, ...spiritFields, ...beastFields];
        } else if(characterType.toLowerCase() === 'hero') {
            showFields = [...showFields, ...heroFields];
            hideFields = [...hideFields, ...deityFields, ...creatureFields, ...mortalFields, ...spiritFields, ...beastFields];
        } else if(characterType.toLowerCase() === 'creature') {
            if(creatureType.toLowerCase() === 'beast') {
                showFields = [...showFields, ...creatureFields, ...beastFields];
                hideFields = [...hideFields, ...heroFields, ...deityFields, ...mortalFields, ...spiritFields];
            } else if (creatureType.toLowerCase() === 'spirit') {
                showFields = [...showFields, ...creatureFields, ...spiritFields];
                hideFields = [...hideFields, ...heroFields, ...deityFields, ...mortalFields, ...beastFields];
            } else {
                showFields = [...showFields, ...creatureFields];
                hideFields = [...hideFields, ...heroFields, ...deityFields, ...mortalFields, ...spiritFields, ...beastFields];
            }
        } else if(characterType.toLowerCase() === 'mortal') {
            showFields = [...showFields, ...mortalFields];
            hideFields = [...hideFields, ...heroFields, ...creatureFields, ...deityFields, ...spiritFields, ...beastFields];
        } else {
            hideFields = [...hideFields, ...mortalFields, ...heroFields, ...creatureFields, ...deityFields, ...spiritFields, ...beastFields];
        }
    } else {
        showHeaders = [...allHeaders];
        showFields = [...memberFields];
        hideFields = [...characterFields, ...deityFields, ...heroFields, ...creatureFields, ...mortalFields, ...spiritFields, ...beastFields];
        completed = checkMemberInputs();

        if(completed) {
            document.querySelector('.sheet-button').classList.remove('hidden');
            document.querySelector('.sheet-button + *').classList.add('hidden');
        } else {
            document.querySelector('.sheet-button').classList.add('hidden');
            document.querySelector('.sheet-button + *').classList.remove('hidden');
        }

        memberInputs.forEach(input => {
            document.querySelector(input).addEventListener('change', () => {
                completed = checkMemberInputs();
                if(completed) {
                    document.querySelector('.sheet-button').classList.remove('hidden');
                    document.querySelector('.sheet-button + *').classList.add('hidden');
                } else {
                    document.querySelector('.sheet-button').classList.add('hidden');
                    document.querySelector('.sheet-button + *').classList.remove('hidden');
                }
            });
        });
    }

    adjustCP(showFields, hideFields, showHeaders);
}
function checkMemberInputs() {
    let completed = true;

    memberInputs.forEach(field => {
        if(!document.querySelector(field).value) {
            completed = false;
        }
    });

    return completed;
}
function createFieldArray(arr, input = false) {
    if(input) {
        return arr.map(item => `#field_${item}_input`);
    }
    return arr.map(item => `#field_${item}`);
}

/****** Members Initialization ******/
function formatMemberRow(type, data, extraFilters = '') {
    let tagList = ``, info = ``, details = ``;
    if(type === 'character') {
        tagList += `${data.character.ageClass} ${data.character.relationshipClass} ${data.character.locationClass}`;
        info += `<div class="member--stats">
            <span>${data.character.age} years old</span>
            <span>${data.character.pronouns}</span>
            <span>${data.character.location}</span>
            <span>${data.writer.alias}</span>
        </div>`;
        details = data.character.overview;
    } else {
        info += `<div class="member--stats">
            <span>${data.writer.age} years old</span>
            <span>${data.writer.pronouns}</span>
            <span>${data.writer.timezone}</span>
            <span>${data.writer.contact}</span>
        </div>`;
        details = data.writer.triggers;
    }
    return `<div class="members--member grid-item g-${data.universal.groupID} ${data.writer.aliasClass} ${type} ${extraFilters} ${tagList}">
        <div class="member">
            <div class="member--top">
                <img src="${data.universal.imageWide}" loading="lazy" />
            </div>
            <div class="member--main">
                <a href="?showuser=${data.universal.id}">${formatName(data.universal.name, 'b')}</a>
                <div class="member--species">Joined ${data.universal.dates.joined}</div>
                <div class="member--species">Last seen ${data.universal.dates.lastActive}</div>
            </div>
            ${info}
            <div class="member--overview"><div class="scroll">
                ${details}
            </div></div>
        </div>
        <div class="hidden member--sortable">
            <span class="member--name">${data.universal.name}</span>
            <span class="member--age">${data.character.age}</span>
            <span class="member--posts">${data.universal.posts}</span>
            <span class="member--join">${data.universal.dates.joined}</span>
        </div>
    </div>`;
}
function toggleListMenu(e) {
    if(e.closest('.members--menu')) {
        e.closest('.members--menu').classList.toggle('is-open');
    } else if(e.closest('.webpage--menu')) {
        e.closest('.webpage--menu').classList.toggle('is-open');
    }
}