/***** Profile *****/
function formatAesthetics(aesthetics, images) {
    let imageHTML;
    switch (aesthetics) {
        case 'Mosaic':
            imageHTML = `<span class="twoWide"><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span class="twoWide"><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>
                <span><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>
                <span class="twoWide"><img src="${images['square-3']}" title="Square #3" alt="Square #3" loading="lazy" /></span>
                <span class="twoHigh"><img src="${images['tall-2']}" title="Tall #2" alt="Tall #2" loading="lazy" /></span>
                <span class="threeWide"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>`;
            break;
        case 'Grid':
            imageHTML = `<span class="twoWide"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>
                <span class="twoHigh"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>
                <span><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>`;
            break;
        case 'Single':
        default: 
        imageHTML = `<span><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>`;
            break;
    }
    return imageHTML;
}
function setRoster() {   
    let alphaChars = Alpha(document.querySelectorAll('select[name=showuser] option'));
    alphaChars.forEach(character => {
        let imageDiv = createAvatars('profile--account-image', character.account, attributes = ``);

        let html = `<a class="profile--account" href="?showuser=${character.account}">
            ${imageDiv}
            <b>${capitalize(character.character)}</b>
        </a>`;

        document.querySelector('.profile--roster').insertAdjacentHTML('beforeend', html);
    });
}
function initProfile (title, ratings) {
    document.querySelector('.profile--header h1').innerHTML = capitalize(title);
    ratings.forEach(rating => formatRating(rating));
    removeBlankFields();
}
function initCharacter(aesthetics, images, overflow, title, birthday, isLocal = false) {
    //remove member sections
    document.querySelectorAll('.memAccOnly').forEach(item => item.remove());

    //set up aesthetics
    if(aesthetics !== `<i>No Information</i>` && aesthetics !== ``) {
        document.querySelector('.profile--aesthetic').innerHTML = formatAesthetics(aesthetics, images);
    }

    //set up age & birthday
    document.querySelector('age-clip').innerText = calculateAge(birthday);
    if (parseInt(birthday.year) < 0) {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year) * -1} BC`;
    } else {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year)}`;
    }

    //Freeform Overflow
    if(overflow !== `` && overflow !== `<i>No Information</i>`) {
        document.querySelector('.clip-freeform-overflow').insertAdjacentHTML('beforeend', overflow);
    }

    //Tracker
    if(!isLocal) {
        FillTracker(title, trackerParams);
    }
}
function initMember() {
    //remove character only sections
    document.querySelectorAll('.charOnly').forEach(item => item.remove());

    //subaccounts list
    setRoster();
}

/****** UserCP/Messages ******/
function cpShift() {
	let imageType = document.querySelector(toggleFields[1]).value,
	    account = document.querySelector(toggleFields[0]).value,
	    showFields = [],
	    hideFields = characterFields
                    .concat(defaultImages)
                    .concat(gridImages)
                    .concat(mosaicImages),
	    showHeaders = allHeaders;

	if(account.toLowerCase() == 'character') {
        if(imageType.toLowerCase() === 'grid') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages);
            hideFields = mosaicImages;
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else if (imageType.toLowerCase() === 'mosaic') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages)
                        .concat(mosaicImages);
            hideFields = [];
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else {
            showFields = characterFields
                        .concat(defaultImages);
            hideFields = gridImages
                        .concat(mosaicImages);
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.add('fullWidth');
        }
    }
    
    adjustCP(showFields, hideFields, showHeaders);
}
function setUpAesthetics() {
    let aestheticsObj = {
        'tall-1': document.querySelector('#field_20_input').value,
        'tall-2': document.querySelector('#field_21_input').value,
        'wide-1': document.querySelector('#field_22_input').value,
        'square-1': document.querySelector('#field_23_input').value,
        'square-2': document.querySelector('#field_24_input').value,
        'square-3': document.querySelector('#field_25_input').value,
    };
    let aesthetics = getSelectText(document.querySelector('#field_19_input')).replace(' ', '');
    return {aestheticsObj, aesthetics};
}
function ucpAesthetics() {
    let imageObj = setUpAesthetics().aestheticsObj;
    let aesthetics = setUpAesthetics().aesthetics;

    let aestheticsSample = document.querySelector('.ucp--description[data-section="Aesthetics"] .sample');
    if(aestheticsSample) {
        aestheticsSample.classList.add(aesthetics.replace(' ', ''));
        aestheticsSample.innerHTML = formatAesthetics(aesthetics, imageObj);
    }
}
function ucpAvatars() {
    let avatarSample = document.querySelector('.ucp--description[data-section="Images"] .sample');
    let avatarObj = {
        'tall': document.querySelector('#field_17_input').value,
        'wide': document.querySelector('#field_18_input').value,
    }
    let { aesthetics, aestheticsObj } = setUpAesthetics();

    let accType = getSelectText(document.querySelector('#field_1_input'));
    if(avatarSample) {
        let html = `<div><strong>Avatars</strong>
            <div class="avatars">
            ${formatAvatars(avatarObj)}
        </div></div>`;

        if(accType === 'character') {
            html += `<div><strong>Aesthetics</strong>
                <div class="profile--aesthetic ${aesthetics}">
                ${formatAesthetics(aesthetics, aestheticsObj)}
            </div></div>`;
        }
        
        avatarSample.innerHTML = html;
    }
}
function formatAvatars(images) {
    let imageHTML = `<span class="tall"><img src="${images['tall']}" title="Tall Avatar" alt="Tall Avatar" loading="lazy" /></span>
    <span class="wide"><img src="${images['wide']}" title="Wide Avatar" alt="Wide Avatar" loading="lazy" /></span>`;
    return imageHTML;
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