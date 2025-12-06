/***** Place a Reserve ******/
let reserveForm = document.querySelector('#form-reserve');
let staticCanons = [], staticSubplots = [];
if(reserveForm) {
    let reserveType = reserveForm.querySelector('#type');
    if(reserveType) {
        simpleFieldToggle(reserveType, '.ifFace', 'face');
        simpleFieldToggle(reserveType, '.ifCanon', 'canon');
        simpleFieldToggle(reserveType, '.ifPlot', 'subplot');
        simpleFieldToggle(reserveType, '.ifReserveDeity', 'deity');
        simpleFieldToggle(reserveType, '.ifReincarnation', 'reincarnation');
        if(getSelectValue(reserveType) === 'canon' && staticCanons.length === 0) {
            fetch(fetchURL(canonsJson))
            .then((response) => response.json())
            .then((canonData) => {
                staticCanons = [...canonData];
                let open = staticCanons.filter(item => item.Status === 'open');
                setList('.clip-canons', open, 'canons');
            });
        } else if (getSelectValue(reserveType) === 'subplot' && staticSubplots.length === 0) {
            fetch(fetchURL(plotsJson, 'info'))
            .then((response) => response.json())
            .then((subplotData) => {
                staticSubplots = [...subplotData];
                setList('.clip-plots', staticSubplots, 'plots');
            });
        }
        reserveType.addEventListener('change', e => {
            if(getSelectValue(e.currentTarget) === 'canon' && staticCanons.length === 0) {
                fetch(fetchURL(canonsJson))
                .then((response) => response.json())
                .then((canonData) => {
                    staticCanons = [...canonData];
                    let open = staticCanons.filter(item => item.Status === 'open');
                    setList('.clip-canons', open, 'canons');
                });
            }
            else if(getSelectValue(e.currentTarget) === 'subplot' && staticSubplots.length === 0) {
                fetch(fetchURL(plotsJson, 'info'))
                .then((response) => response.json())
                .then((subplotData) => {
                    staticSubplots = [...subplotData];
                    setList('.clip-plots', staticSubplots, 'plots');
                });
            }
        })
        let plotReserve = reserveForm.querySelector('#plot');
        let plotSectionReserve = reserveForm.querySelector('#section');
        plotReserve.addEventListener('change', e => {
            let selected = getSelectValue(e.currentTarget);
            let plotData = staticSubplots.filter(item => item.PlotID === selected)[0];
            if(plotData) {
                let sections = JSON.parse(plotData.Sections);
                setList('.clip-sections', sections, 'plotsections');
            } else {
                reserveForm.querySelector('.clip-sections').innerHTML = '';
            }
        });
        plotSectionReserve.addEventListener('change', e => {
            let selectedPlot = getSelectValue(plotReserve);
            let selectedSection = getSelectValue(e.currentTarget);
            let plotData = staticSubplots.filter(item => item.PlotID === selectedPlot)[0];
            if(plotData) {
                let sections = JSON.parse(plotData.Sections);
                let sectionData = sections.filter(item => item.title === selectedSection)[0];
                if(sectionData) {
                    setList('.clip-roles', sectionData.roles, 'plotroles');
                } else {
                    reserveForm.querySelector('.clip-roles').innerHTML = '';
                }
            } else {
                reserveForm.querySelector('.clip-roles').innerHTML = '';
            }
        });
    }

    document.querySelector('#form-reserve').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            alias = form.querySelector('#alias'),
            type = form.querySelector('#type'),
            face = form.querySelector('#face'),
            plot = form.querySelector('#plot'),
            section = form.querySelector('#section'),
            role = form.querySelector('#role'),
            canon = form.querySelector('#canon'),
            deity = form.querySelector('#deity'),
            reincarnation = form.querySelector('#reincarnation');

        let data = {
            DeployID: deployID.claims,
            Member: getStandardValue(alias),
            Extension: 0,
        }

        let reservedText = '';

        switch(getSelectValue(type)) {
            case 'subplot':
                data.SubmissionType = 'reserve-role';
                data.Plot = getSelectText(plot);
                data.Section = getSelectText(section);
                data.Role = getSelectText(role);
                reservedText = `${capitalize(data.Role, [' ', '-'])} (${capitalize(data.Section, [' ', '-'])}) in ${capitalize(data.Plot, [' ', '-'])}`;
                break;
            case 'canon':
                data.SubmissionType = 'reserve-general';
                data.Reserve = getSelectText(canon);
                data.Type = getSelectValue(type);
                data.Taken = JSON.stringify({
                    alias: data.Member,
                    account: '0',
                    type: 'reserved',
                });
                reservedText = capitalize(data.Reserve);
                break;
            case 'face':
                data.SubmissionType = 'reserve-general';
                data.Type = getSelectValue(type);
                data.Reserve = getStandardValue(face);
                reservedText = capitalize(data.Reserve);
                break;
            case 'deity':
                data.SubmissionType = 'reserve-general';
                data.Type = getSelectValue(type);
                data.Reserve = getStandardValue(deity);
                reservedText = capitalize(data.Reserve);
                break;
            case 'reincarnation':
                data.SubmissionType = 'reserve-general';
                data.Type = getSelectValue(type);
                data.Reserve = getStandardValue(reincarnation);
                reservedText = capitalize(data.Reserve);
                break;
            default:
                break;
        }

        let staffDiscord = {
            title: `New ${capitalize(getSelectValue(type))} Reservation`,
            text: `${capitalize(data.Member)} has reserved ${reservedText}`,
            hook: reserveLogs,
        }

        setFormStatus(form);
        
        checkClaims(form, data, getSelectValue(type), staffDiscord);
    });
}

/***** Add a Business *****/
let addBusiness = document.querySelector('#form-add-business');
if(addBusiness) {
    let addBusinessHours = addBusiness.querySelector('#hours');
    if(addBusinessHours) {simpleFieldToggle(addBusinessHours, '.ifSetHours', 'set hours')};
    addBusiness.addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            member = form.querySelector('#member'),
            employer = form.querySelector('#employer'),
            category = form.querySelector('#category'),
            location = form.querySelector('#location'),
            locationId = form.querySelector('#location'),
            hiring = form.querySelector('#hiring'),
            wanted = form.querySelector('#wanted'),
            summary = form.querySelector('#summary'),
            hoursField = form.querySelector('#hours'),
            hours = [];

        if(getSelectValue(hoursField) === 'set hours') {
            let hourSets = form.querySelectorAll('.hours-wrap .row');
            hourSets.forEach(set => {
                let rangeStart = set.querySelector('.days-start select').options[set.querySelector('.days-start select').selectedIndex].value.trim();
                let rangeEnd = set.querySelector('.days-end select').options[set.querySelector('.days-end select').selectedIndex].value.trim();
                let timeStart =  capitalize(set.querySelector('.time-start input').value.toLowerCase().trim(), [' ']);
                let timeEnd = set.querySelector('.time-end input').value !== `` && capitalize(set.querySelector('.time-end input').value.toLowerCase().trim(), [' ']);

                hours.push({
                    range: `${rangeStart} - ${rangeEnd}`.trim(),
                    time: timeEnd ? `${timeStart} - ${timeEnd}`.trim() : timeStart.trim(),
                });
            });
        } else {
            hours.push({
                text: getSelectValue(hoursField),
            });
        }

        let data = {
            DeployID: deployID.claims,
            SubmissionType: 'add-business',
            Owner: JSON.stringify({
                alias: getSelectText(member),
                id: getSelectValue(member)
            }),
            Employer: getStandardValue(employer),
            Category: getSelectText(category),
            Location: getSelectText(location),
            LocationID: getSelectValue(locationId),
            Summary: getValue(summary),
            Hours: JSON.stringify(hours),
            Hiring: getSelectValue(hiring),
            Wanted: getValue(wanted),
        }

        let staffDiscord = {
            title: `New Business Added: ${capitalize(data.Employer, [' ', '-'])}`,
            text: `**Submitted by:** ${capitalize(getSelectText(member), [' ', '-'])} (#${getSelectValue(member)})
            **View here:** <https://${siteName}.jcink.net/?act=Pages&kid=businesses#${cleanText(data.Employer)}>`,
            hook: businessLogs,
        }
        
        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add a Character *****/
let sortForm = document.querySelector('#form-sort');
let staticCreatures = [];
if(sortForm) {
    let requestToggle = sortForm.querySelector('#requested');
    let canonToggle = sortForm.querySelector('#canonreq');
    let ancestryToggle = sortForm.querySelector('#ancestry');
    let reincarnationToggle = sortForm.querySelector('#exclusivity');

    if(requestToggle) {simpleFieldToggle(requestToggle, '.ifRequest', 'y')};
    if(reincarnationToggle) {simpleFieldToggle(reincarnationToggle, '.ifReincarnation', 'y')};
    if(canonToggle) {
        simpleFieldToggle(canonToggle, '.ifCanon', 'y');
        if(staticCanons.length === 0) {
            fetch(fetchURL(canonsJson))
            .then((response) => response.json())
            .then((canonData) => {
                staticCanons = [...canonData];
                let open = staticCanons.filter(item => item.Status === 'open');
                setList('.clip-canons', open, 'canons');
            });
        }
    };
    if(ancestryToggle) {
        simpleFieldToggle(ancestryToggle, '.ifDeity', 'deity');
        simpleFieldToggle(ancestryToggle, '.ifHero', 'hero');
        simpleFieldToggle(ancestryToggle, '.ifCreature', 'creature');
        simpleFieldToggle(ancestryToggle, '.ifMortal', 'mortal');
        if(getSelectValue(ancestryToggle) === 'creature' && staticCreatures.length === 0) {
            fetch(fetchURL(creaturesJson, 'info'))
            .then((response) => response.json())
            .then((creatureData) => {
                let beasts = creatureData.filter(item => item.Type === 'beast');
                let subspeciesArray = [];
                beasts.forEach(beast => {
                    let subspecies = JSON.parse(beast.Subspecies).map(item => ({
                        title: item.type,
                        value: `${beast.Creature}-${cleanText(item.type)}`,
                    }));
                    subspeciesArray = [...subspeciesArray, ...subspecies]; 
                });

                let spirits = creatureData.filter(item => item.Type === 'spirit');
                let subtypesArray = [];
                spirits.forEach(spirit => {
                    let subtypes = JSON.parse(spirit.Subtypes).map(item => ({
                        title: item,
                        value: `${spirit.Creature}-${item}`,
                    }));
                    subtypesArray = [...subtypesArray, ...subtypes]; 
                });

                setList('.clip-species', beasts, 'species');
                setList('.clip-elements', spirits, 'species');
                setList('.clip-subtypes', subtypesArray, 'subtypes');
                setList('.clip-subspecies', subspeciesArray, 'subtypes');
            });
        }
        ancestryToggle.addEventListener('change', e => {
            if(getSelectValue(e.currentTarget) === 'creature' && staticCreatures.length === 0) {
                fetch(fetchURL(creaturesJson, 'info'))
                .then((response) => response.json())
                .then((creatureData) => {
                    let beasts = creatureData.filter(item => item.Type === 'beast');
                    let subspeciesArray = [];
                    beasts.forEach(beast => {
                        let subspecies = JSON.parse(beast.Subspecies).map(item => ({
                            title: item.type,
                            value: `${beast.Creature}-${cleanText(item.type)}`,
                        }));
                        subspeciesArray = [...subspeciesArray, ...subspecies]; 
                    });
    
                    let spirits = creatureData.filter(item => item.Type === 'spirit');
                    let subtypesArray = [];
                    spirits.forEach(spirit => {
                        let subtypes = JSON.parse(spirit.Subtypes).map(item => ({
                            title: item,
                            value: `${spirit.Creature}-${item}`,
                        }));
                        subtypesArray = [...subtypesArray, ...subtypes]; 
                    });
    
                    setList('.clip-species', beasts, 'species');
                    setList('.clip-elements', spirits, 'species');
                    setList('.clip-subtypes', subtypesArray, 'subtypes');
                    setList('.clip-subspecies', subspeciesArray, 'subtypes');
                });
            }
        });
        let creatureTypeToggle = sortForm.querySelector('#creatureType');
        if(creatureTypeToggle) {
            simpleFieldToggle(creatureTypeToggle, '.ifBeast', 'beast');
            simpleFieldToggle(creatureTypeToggle, '.ifSpirit', 'spirit');
            ancestryToggle.addEventListener('change', e => {
                if(getSelectValue(e.currentTarget) !== 'creature') {
                    creatureTypeToggle.value = '';
                    sortForm.querySelectorAll('.ifBeast').forEach(item => item.classList.add('hidden'));
                    sortForm.querySelectorAll('.ifSpirit').forEach(item => item.classList.add('hidden'));
                }
            });
        }
    }
    //handle spirit subtypes
    let elementToggle = sortForm.querySelector('#element');
    elementToggle.addEventListener('change', e => {
        let types = Array.from(sortForm.querySelectorAll('#subtype option'));
        let element = getSelectValue(e.currentTarget);
        if(element === '') {
            types.forEach(el => {
                if(el.value === '') {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        } else {
            types.forEach(el => {
                if(el.value.includes(`${element}-`) || el.value === '') {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        }
    });
    //handle subspecies
    let speciesToggle = sortForm.querySelector('#species');
    speciesToggle.addEventListener('change', e => {
        let types = Array.from(sortForm.querySelectorAll('#subspecies option'));
        let species = getSelectValue(e.currentTarget);
        if(species === '') {
            types.forEach(el => {
                if(el.value === '') {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        } else {
            types.forEach(el => {
                if(el.value.includes(`${species}-`) || el.value === '') {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        }
    });

    document.querySelector('#form-sort').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            member = form.querySelector('#member'),
            character = form.querySelector('#character'),
            accountId = form.querySelector('#accountid'),
            group = form.querySelector('#group'),
            face = form.querySelector('#face'),
            ancestry = form.querySelector('#ancestry'),
            pantheon = form.querySelector('#pantheon'),
            domain = form.querySelector('#domain'),
            parent = form.querySelector('#parent'),
            gifts = form.querySelector('#gifts'),
            creatureType = form.querySelector('#creatureType'),
            species = form.querySelector('#species'),
            subspecies = form.querySelector('#subspecies'),
            element = form.querySelector('#element'),
            subtype = form.querySelector('#subtype'),
            denomination = form.querySelector('#denomination'),
            patronDeity = form.querySelector('#patron'),
            canonReq = form.querySelector('#canonreq'),
            canon = form.querySelector('#canon'),
            requested = form.querySelector('#requested'),
            requestDetails = form.querySelector('#request'),
            jobSets = document.querySelectorAll('.job-wrap'),
            roleSets = document.querySelectorAll('.role-wrap'),
            exclusivity = form.querySelector('#exclusivity'),
            reincarnation = form.querySelector('#reincarnation'),
            jobs = [], roles = [], canonData;

        //folklore claims
        let folkloreFormatted = {
            type: getSelectValue(ancestry),
        }
        switch(getSelectValue(ancestry)) {
            case 'deity':
                folkloreFormatted.pantheon = getStandardValue(pantheon);
                folkloreFormatted.domain = getStandardValue(domain);
                break;
            case 'hero':
                folkloreFormatted.parent = getStandardValue(parent);
                folkloreFormatted.gifts = getStandardValue(gifts);
                break;
            case 'creature':
                folkloreFormatted.creatureType = getSelectValue(creatureType);
                if(getSelectValue(creatureType) === 'beast') {
                    folkloreFormatted.species = getSelectValue(species);
                    folkloreFormatted.subspecies = getSelectValue(subspecies) !== '' ? getSelectText(subspecies) : '';
                } else {
                    folkloreFormatted.element = getSelectValue(element);
                    folkloreFormatted.subtype = getSelectText(subtype);
                }
                break;
            case 'mortal':
                folkloreFormatted.denomination = getStandardValue(denomination) !== '' ? getStandardValue(denomination) : 'non-worshipping';
                folkloreFormatted.patron = getStandardValue(patronDeity) !== '' ? getStandardValue(patronDeity) : 'non-worshipping';
                break;
            default:
                break;
        }

        //jobs array
        if(jobSets.length > 0) {
            jobSets.forEach(job => {
                jobs.push({
                    employer: getSelectText(job.querySelector('.employer select')),
                    section: job.querySelector('.job-section input').value.toLowerCase().trim(),
                    position: job.querySelector('.position input').value.toLowerCase().trim(),
                });
            });
        }

        //roles array
        if(roleSets.length > 0) {
            roleSets.forEach(role => {
                roles.push({
                    plot: getSelectText(role.querySelector('.plot select')),
                    section: getSelectText(role.querySelector('.plot-section select')),
                    role: getSelectText(role.querySelector('.role select')),
                });
            });
        }

        //set character data
        let characterData = {
            DeployID: deployID.claims,
            SubmissionType: 'add-claims',
            Member: getSelectText(member),
            Character: getStandardValue(character),
            AccountID: getAccountID(accountId),
            ParentID: getSelectValue(member),
            Group: getSelectText(group),
            GroupID: getSelectValue(group),
            Face: getStandardValue(face),
            Folklore: JSON.stringify(folkloreFormatted),
            Reincarnation: getSelectValue(exclusivity) === 'y' ? getStandardValue(reincarnation) : '',
            Jobs: jobs.length > 0 ? JSON.stringify(jobs) : '',
            Roles: roles.length > 0 ? JSON.stringify(roles) : '',
            Status: 'pending',
        }

        //set canon data if claiming
        if(getSelectValue(canonReq) === 'y') {
            canonData = {
                DeployID: deployID.claims,
                SubmissionType: 'claim-canon',
                Member: JSON.stringify({
                    alias: getSelectText(member),
                    id: characterData.AccountID,
                }),
                Canon: getSelectText(canon),
            }
        }

        let requestMessage = ``;
        let publicRequestMessage = ``;
        if(getSelectValue(requested) === 'y') {
            requestMessage = `

            > ${getValue(requestDetails)}`;

            publicRequestMessage = `
            
            _This character fills one or more request. Members managing those requests will be contacted prior to character approval and sorting._`;
        }

        let isFirst = staticClaims.filter(item => item.ParentID === getSelectValue(member)).length === 0;

        let staffDiscord = {
            title: `New Sorting Request: ${capitalize(characterData.Character)}`,
            text: `**Played by:** [${capitalize(characterData.Member, [' ', '-'])}](<https://${siteName}.jcink.net/?showuser=${characterData.ParentID}>)
            **Group:** ${capitalize(characterData.Group, [' '])}
            **First Character?** ${isFirst ? 'yes' : 'no'}
            **Requested?** ${capitalize(getSelectText(form.querySelector('#requested')))}${requestMessage}
            
            [**View Profile**](<https://${siteName}.jcink.net/?showuser=${characterData.AccountID}>)
            
            Please add this task to the JIRA board and mark this log with a checkmark. To sort the character, assign the JIRA task to yourself, move to the In Progress status, and then follow the acceptance process outlined in the Documentation.`,
            hook: staffSortLogs,
            color: rgbToHex(colors[characterData.Group][0], colors[characterData.Group][1], colors[characterData.Group][2]),
        }

        let publicDiscord = {
            title: `${capitalize(characterData.Member, [' ', '-'])} has finished ${capitalize(characterData.Character)}!`,
            text: `> _looks like ${characterData.Face}, belongs in ${characterData.Group}_

            [**Learn More**](<https://${siteName}.jcink.net/?showuser=${characterData.AccountID}>)${publicRequestMessage}`,
            hook: sortLogs,
            notification: `<@&${staffDiscordRole}>`,
            color: rgbToHex(colors[characterData.Group][0], colors[characterData.Group][1], colors[characterData.Group][2]),
        }

        setFormStatus(form);

        if(getSelectValue(canonReq) === 'y') {
            sendAjax(form, canonData);
        }

        sendAjax(form, characterData, staffDiscord, publicDiscord);
    });
}

/***** Edit Character Claims *****/
let editCharacterForm = document.querySelector('#form-edit-character');
if(editCharacterForm) {
    let profile = editCharacterForm.querySelector('#account');
    let nameBox = editCharacterForm.querySelector('[value="character"]');
    let groupBox = editCharacterForm.querySelector('[value="group"]');
    let jobAddBox = editCharacterForm.querySelector('[value="jobs-add"]');
    let jobChangeBox = editCharacterForm.querySelector('[value="jobs-change"]');
    let jobRemoveBox = editCharacterForm.querySelector('[value="jobs-remove"]');
    let roleAddBox = editCharacterForm.querySelector('[value="roles-add"]');
    let roleChangeBox = editCharacterForm.querySelector('[value="roles-change"]');
    let roleRemoveBox = editCharacterForm.querySelector('[value="roles-remove"]');
    if(nameBox) {checkToggle(nameBox, '.ifName')};
    if(groupBox) {checkToggle(groupBox, '.ifGroup')};
    if(jobAddBox) {checkToggle(jobAddBox, '.ifJobAdd')};
    if(jobChangeBox) {checkToggle(jobChangeBox, '.ifJobChange')};
    if(jobRemoveBox) {checkToggle(jobRemoveBox, '.ifJobRemove')};
    if(roleAddBox) {checkToggle(roleAddBox, '.ifRoleAdd')};
    if(roleChangeBox) {checkToggle(roleChangeBox, '.ifRoleChange')};
    if(roleRemoveBox) {checkToggle(roleRemoveBox, '.ifRoleRemove')};
    profile.addEventListener('input', e => {
        pullCharacterClaims(e.currentTarget);
    });
    editCharacterForm.addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="edit-character"]')).filter(item => item.checked).map(item => item.value),
            account = form.querySelector('#account'),
            character = form.querySelector('#character'),
            group = form.querySelector('#group');

        let data = {
            DeployID: deployID.claims,
            SubmissionType: `edit-claims`,
            AccountID: getSelectValue(account),
            selectedChanges,
            Character: getStandardValue(character),
            Group: getSelectText(group),
            GroupID: getSelectValue(group),
        }

        setFormStatus(form);

        editCharacter(form, data);
    });
}

/***** Edit Business *****/
let editBusinessForm = document.querySelector('#form-edit-business');
if(editBusinessForm) {
    let wantedBox = editBusinessForm.querySelector('[value="wanted"]');
    let hiringBox = editBusinessForm.querySelector('[value="hiring"]');
    let hoursBox = editBusinessForm.querySelector('[value="hours"]');
    let editHours = editBusinessForm.querySelector('#hours');
    if(wantedBox) {checkToggle(wantedBox, '.ifWanted')};
    if(hiringBox) {checkToggle(hiringBox, '.ifHiring')};
    if(hoursBox) {checkToggle(hoursBox, '.ifHours')};
    if(editHours) {simpleFieldToggle(editHours, '.ifSetHours', 'set hours')};
    editBusinessForm.addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="edit-business"]')).filter(item => item.checked).map(item => item.value),
            employer = form.querySelector('#employer'),
            hiring = form.querySelector('#hiring'),
            wanted = form.querySelector('#wanted'),
            hours = [];

        if(form.querySelector('#hours').options[form.querySelector('#hours').selectedIndex].value === 'set hours') {
            let hourSets = form.querySelectorAll('.hours-wrap .row');
            hourSets.forEach(set => {
                let rangeStart = getSelectValue(set.querySelector('.days-start select'));
                let rangeEnd = getSelectValue(set.querySelector('.days-end select'));
                let timeStart =  capitalize(getStandardValue(set.querySelector('.time-start input')), [' ']);
                let timeEnd = getStandardValue(set.querySelector('.time-end input')) !== `` && capitalize(getStandardValue(set.querySelector('.time-end input')), [' ']);

                hours.push({
                    range: `${rangeStart} - ${rangeEnd}`.trim(),
                    time: timeEnd ? `${timeStart} - ${timeEnd}`.trim() : timeStart.trim(),
                });
            });
        } else {
            hours.push({
                text: getSelectValue(form.querySelector('#hours')),
            });
        }

        let data = {
            DeployID: deployID.claims,
            SubmissionType: 'edit-business',
            selectedChanges: selectedChanges,
            Employer: getSelectText(employer),
            Hours: JSON.stringify(hours),
            Hiring: getSelectValue(hiring),
            Wanted: getValue(wanted),
        }

        setFormStatus(form);

        editBusiness(form, data);
    });
}

/***** Request Help *****/
if(document.querySelector('#form-moderation')) {
    let requestType = document.querySelector('#form-moderation #type');
    if(requestType) {
        simpleFieldToggle(requestType, '.ifBoard', 'board');
        simpleFieldToggle(requestType, '.ifThread', 'thread');
        simpleFieldToggle(requestType, '.ifAccount', 'account');
        simpleFieldToggle(requestType, '.ifOther', 'other');
        complexFieldToggle(requestType, '.ifNotThread', ['', 'thread'], false);
    }
    document.querySelector('#form-moderation').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget;
    let type = getSelectValue(form.querySelector('#type'));
    let requester = getStandardValue(form.querySelector('#requester'));
    let board, parent, threads, moveTo, account, request;
    let discord = {
        title: `New Moderation Request: ${capitalize(type, [' '])}`,
        text: `**Requested by:** ${capitalize(requester, [' ', '-'])}\n`,
        hook: modLogs,
    };
    switch(type) {
        case `board`:
            board = getStandardValue(form.querySelector('#board'));
            parent = getStandardValue(form.querySelector('#parent'));
            request = getValue(form.querySelector('#request'));
            discord.text += `**Board Title:** ${capitalize(board)}
            **Location:** ${capitalize(parent)}
            **Request Details:**
            ${request}`;
            break;
        case `thread`:
            threads = getValue(form.querySelector('#threads'));
            moveTo = getSelectText(form.querySelector('#thread-location'));
            discord.text += `**Move To:** ${moveTo}
            **Thread(s) to Move:**
            ${threads}`;
            break;
        case `account`:
            account = getStandardValue(form.querySelector('#account'));
            request = getValue(form.querySelector('#request'));
            discord.text += `**Account:** ${account}
            **Request:**
            ${request}`;
            break;
        case `other`:
            request = getValue(form.querySelector('#request'));
            discord.text += `**Request:**
            ${request}`;
            break;
        default:
            break;
    }

    sendDiscordMessage(`https://discord.com/api/webhooks/${discord.hook}`, discord.title, discord.text);

    form.innerHTML = successMessage;
    });
}