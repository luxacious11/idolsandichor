/***** Approve Character *****/
if(document.querySelector('#form-approve')) {
    document.querySelector('#form-approve').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            id = form.querySelector('#id');
        
        let data = {
            DeployID: deployID.claims,
            SubmissionType: 'approve-character',
            AccountID: getSelectValue(id),
            Status: approvedText,
        }

        let existing = staticClaims.filter(item => item.AccountID === data.AccountID)[0];
        let folklore = JSON.parse(existing.Folklore);
        let folkloreFormatted = ``;
        switch(folklore.type) {
            case `deity`:
                folkloreFormatted = `The ${capitalize(folklore.pantheon, [' ', '-'])} deity of ${folklore.domain}`;
                break;
            case `hero`:
                folkloreFormatted = `Child of ${capitalize(folklore.parent)}, Gifted with ${folklore.gifts}`;
                break;
            case `creature`:
                if(folklore.creatureType === 'spirit') {
                    folkloreFormatted = `${capitalize(folklore.element, [' ', '-']).trim()} spirit (${capitalize(folklore.subtype, [' ', '-']).trim()})`;
                } else {
                    folkloreFormatted = `${capitalize(folklore.species, [' ', '-']).trim()}${folklore.subspecies !== '' ? ` (${capitalize(folklore.subspecies, [' ', '-']).trim()})`: ''}`;
                }
                break;
            case `mortal`:
                if(folklore.denomination === 'non-worshipping') {
                    folkloreFormatted = `Non-worshipping mortal`;
                } else {
                    folkloreFormatted = `Mortal, Worships ${capitalize(folklore.patron)} of the ${capitalize(folklore.denomination)} pantheon`;
                }
                break;
            default:
                break;
        }

        let publicDiscord = {
            title: `Welcome to Elysium!`,
            text: `## ${capitalize(existing.Character)}
**${folkloreFormatted}
Played by ${capitalize(existing.Member, [' ', '-'])}**
_looks like ${existing.Face}, belongs in ${existing.Group}_

[**Read More**](https://${siteName}.jcink.net/?showuser=${existing.AccountID})`,
            hook: announceLogs,
            color: rgbToHex(colors[existing.Group][0], colors[existing.Group][1], colors[existing.Group][2]),
        }

        setFormStatus(form);
        
        sendAjax(form, data, publicDiscord);
    });
}

/***** Add Plot *****/
if(document.querySelector('#form-add-plot')) {
    document.querySelector('#form-add-plot').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            plot = form.querySelector('#plot'),
            id = form.querySelector('#id'),
            priority = form.querySelector('#priority'),
            overview = form.querySelector('#overview'),
            sectionWraps = form.querySelectorAll('.section-wrap'),
            sections = [];

        sectionWraps.forEach((sectionWrap, i) => {
            let title = getStandardValue(sectionWrap.querySelector('.section-title input'));
            let priority = i + 1;
            let overview = getValue(sectionWrap.querySelector('.section-overview textarea'));
            let roleWraps = sectionWrap.querySelectorAll('.section-role');
            let roles = [];

            roleWraps.forEach((roleWrap, i) => {
                let title = getStandardValue(roleWrap.querySelector('.role-title input'));
                let priority = i + 1;
                let limit = getStandardValue(roleWrap.querySelector('.role-limit input'));
                let description = getValue(roleWrap.querySelector('.role-description input'));
                roles.push({
                    role: title,
                    priority: priority,
                    limit: limit,
                    description: description,
                });
            });

            sections.push({
                title: title,
                priority: priority,
                overview: overview,
                roles: roles,
            });
        });

        let data = {
            DeployID: deployID.info,
            SubmissionType: 'add-plot',
            Plot: getStandardValue(plot),
            PlotID: getStandardValue(id),
            Priority: getValue(priority),
            Overview: getValue(overview),
            Sections: JSON.stringify(sections),
        }

        let staffDiscord = {
            title: `New Plot Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add Group *****/
if(document.querySelector('#form-group')) {
    document.querySelector('#form-group').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            group = form.querySelector('#group'),
            id = form.querySelector('#id'),
            type = form.querySelector('#type'),
            rgb = form.querySelector('#rgb'),
            about = form.querySelector('#about'),
            image1 = form.querySelector('#image1'),
            image2 = form.querySelector('#image2'),
            image3 = form.querySelector('#image3'),
            visibility = form.querySelector('#visibility');

        let imageArray = [getValue(image1), getValue(image2), getValue(image3)];

        let data = {
            DeployID: deployID.info,
            SubmissionType: 'add-group',
            Group: getStandardValue(group),
            GroupID: getValue(id),
            Type: getSelectValue(type),
            Description: getValue(about),
            Images: JSON.stringify(imageArray),
            Color: getValue(rgb),
            Hidden: getSelectValue(visibility),
        }

        let staffDiscord = {
            title: `New Group Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add Location *****/
if(document.querySelector('#form-location')) {
    document.querySelector('#form-location').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            location = form.querySelector('#location'),
            forum = form.querySelector('#forum'),
            id = form.querySelector('#forumid'),
            about = form.querySelector('#about'),
            image = form.querySelector('#image');

        let data = {
            DeployID: deployID.info,
            SubmissionType: 'add-location',
            Location: getStandardValue(location),
            Board: getStandardValue(forum),
            BoardID: getValue(id),
            Description: getValue(about),
            Image: getValue(image),
        }

        let staffDiscord = {
            title: `New Location Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add Canon *****/
if(document.querySelector('#form-canon')) {
    document.querySelector('#form-canon').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            canon = form.querySelector('#canon'),
            ancestry = form.querySelector('#ancestry'),
            pronouns = form.querySelector('#pronouns'),
            detail1 = form.querySelector('#detail1'),
            detail2 = form.querySelector('#detail2'),
            recognition = form.querySelector('#recognition'),
            influence = form.querySelector('#influence'),
            ability = form.querySelector('#ability'),
            strength = form.querySelector('#strength'),
            about = form.querySelector('#about');

        let scalesFormatted = {
            recognition: getSelectValue(recognition),
            influence: getSelectValue(influence),
            ability: getSelectValue(ability),
            strength: getSelectValue(strength),
        }

        let data = {
            DeployID: deployID.claims,
            SubmissionType: 'add-canon',
            Canon: getStandardValue(canon),
            Pronouns: getStandardValue(pronouns),
            Ancestry: getSelectValue(ancestry),
            Details: JSON.stringify([getStandardValue(detail1), getStandardValue(detail2)]),
            Summary: getValue(about),
            Scales: JSON.stringify(scalesFormatted),
            Status: 'open',
        }

        let staffDiscord = {
            title: `New Canon Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add Creature *****/
let creatureForm = document.querySelector('#form-creature');
if(creatureForm) {
    let creatureType = creatureForm.querySelector('#type');
    simpleFieldToggle(creatureType, '.ifSpirit', 'spirit');

    document.querySelector('#form-creature').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            creature = form.querySelector('#creature'),
            type = form.querySelector('#type'),
            lifespan = form.querySelector('#lifespan'),
            overview = form.querySelector('#overview'),
            physiology = form.querySelector('#physiology'),
            perception = form.querySelector('#perception'),
            trust = form.querySelector('#trust'),
            presence = form.querySelector('#presence'),
            knowledge = form.querySelector('#knowledge'),
            subtypes = form.querySelectorAll('.subtype-row'),
            abilities = form.querySelectorAll('.ability-row'),
            weaknesses = form.querySelectorAll('.weakness-row'),
            subspecies = form.querySelectorAll('.subspecies-row'),
            subtypesArray = [], abilitiesArray = [], weaknessesArray = [], subspeciesArray = [];

        subtypes.forEach(subtype => {
            subtypesArray.push(getStandardValue(subtype.querySelector('input')));
        });

        abilities.forEach(ability => {
            abilitiesArray.push(getStandardValue(ability.querySelector('input')));
        });

        weaknesses.forEach(weakness => {
            weaknessesArray.push(getStandardValue(weakness.querySelector('input')));
        });

        subspecies.forEach(item => {
            subspeciesArray.push({
                type: getStandardValue(item.querySelector('input')),
                about: getValue(item.querySelector('textarea')),
            });
        });

        let scalesFormatted = {
            trust: getSelectValue(trust),
            perception: getSelectValue(perception),
            knowledge: getSelectValue(knowledge),
            presence: getSelectValue(presence),
        }

        let data = {
            DeployID: deployID.info,
            SubmissionType: 'add-creature',
            Creature: getStandardValue(creature),
            Type: getSelectValue(type),
            Subtypes: JSON.stringify(subtypesArray),
            Lifespan: getStandardValue(lifespan),
            Overview: getValue(overview),
            Physiology: getValue(physiology),
            Abilities: JSON.stringify(abilitiesArray),
            Weaknesses: JSON.stringify(weaknessesArray),
            Scales: JSON.stringify(scalesFormatted),
            Subspecies: JSON.stringify(subspeciesArray),
        }

        let staffDiscord = {
            title: `New Creature Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);

        sendAjax(form, data, staffDiscord);
    });
}

/***** Add Event *****/
if(document.querySelector('#form-add-event')) {
    document.querySelector('#form-add-event').addEventListener('submit', e => {
        e.preventDefault();

        let form = e.currentTarget,
            event = form.querySelector('#event'),
            start = form.querySelector('#start'),
            end = form.querySelector('#end'),
            close = form.querySelector('#close'),
            overview = form.querySelector('#overview'),
            roleWraps = form.querySelectorAll('.eventrole-wrap'),
            roles = [];

        roleWraps.forEach((roleWrap, i) => {
            let title = getStandardValue(roleWrap.querySelector('.eventrole-title input'));
            let priority = i + 1;
            let overview = getValue(roleWrap.querySelector('.eventrole-overview input'));
            let details = getStandardValue(roleWrap.querySelector('.eventrole-details input'));

            roles.push({
                title: title,
                priority: priority,
                overview: overview,
                details: details && details !== '' ? details : '',
            });
        });

        let data = {
            DeployID: deployID.info,
            SubmissionType: 'add-event',
            Event: getStandardValue(event),
            Start: getValue(start),
            Close: getValue(close),
            End: getValue(end),
            Overview: getValue(overview),
            Roles: JSON.stringify(roles),
        }

        let staffDiscord = {
            title: `New Event Added`,
            text: `No extra actions required.`,
            hook: staffLogs,
        }

        setFormStatus(form);
        
        sendAjax(form, data, staffDiscord);
    });
}