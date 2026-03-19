function formatEvents(events, characters, members) {
    events.sort((a, b) => {
        if(new Date(a.Start) < new Date(b.Start)) {
            return -1;
        } else if(new Date(a.Start) > new Date(b.Start)) {
            return 1;
        } else {
            return 0;
        }
    });
    events.forEach(event => {
        document.querySelector('.webpage--menu .accordion').insertAdjacentHTML('beforeend', formatEventMenu(event));
        document.querySelector('.webpage--content').insertAdjacentHTML('beforeend', formatEventCategory(event, characters, members));
    });
}
function showSignup(event) {
    return checkActiveReserve(new Date(event.Close)) < 1;
}
function formatEventMenu(event) {
    return `<tag-label class="tab-category accordion--trigger" data-category="event-${event.EventID}">
    <span>${capitalize(event.Event, [' ', '-'])}</span>
</tag-label>
<div class="tab-category accordion--content" data-category="event-${event.EventID}"><div class="accordion--inner">
    <span class="h7" style="margin: 0;">${event.End === '' ? 'Begins' : 'Runs'} ${event.End === '' ? event.Start : event.Start.split(',')[0]}${event.End === '' ? '' : ` - ${event.End}`}</span>
    <a href="#e${event.EventID}-intro">Introduction</a>
    ${eventExtras[event.Event] ? `<a href="#e${event.EventID}-info">Additional Info</a>` : ``}
    <a href="#e${event.EventID}-roles">Roles</a>
    <a href="#e${event.EventID}-injury">Injury Levels</a>
    ${showSignup(event) ? `<a href="#e${event.EventID}-signup">Signup</a>` : ``}
    <a href="#e${event.EventID}-cast">Cast List</a>
</div></div>`;
}
function formatEventCategory(event, characters, members) {
    event.Roles.sort((a, b) => {
        if(a.priority < b.priority) {
            return -1;
        } else if (a.priority > b.priority) {
            return 1;
        } else {
            return 0;
        }
    });

    let cast = characters
                .map(item => ({
                    ...item,
                    EventStats: item.EventStats && item.EventStats !== '' ? JSON.parse(item.EventStats).filter(item => parseInt(item.eventId) === parseInt(event.EventID)) : [],
                }))
                .filter(item => item.EventStats.length > 0);

    return `<tag-tab class="tab-category" data-category="event-${event.EventID}">
        <tag-tabset>
            <tag-tab data-key="#e${event.EventID}-intro">
                <div class="webpage--content-inner">
                    <div class="h2 serif">${capitalize(event.Event, [' ', '-'])}</div>
                    <div class="h8">Sign-ups close ${event.Close}<br>${event.End === '' ? 'Begins' : 'Runs'} ${event.End === '' ? event.Start : event.Start.split(',')[0]}${event.End === '' ? '' : ` - ${event.End}`}</div>
                    ${event.Overview}
                </div>
            </tag-tab>
            ${eventExtras[event.Event] ? `<tag-tab data-key="#e${event.EventID}-info">
                <div class="webpage--content-inner">
                    <div class="h2 serif">Additional Info</div>
                    ${eventExtras[event.Event]}
                </div>
            </tag-tab>` : ``}
            <tag-tab data-key="#e${event.EventID}-roles">
                <div class="webpage--content-inner">
                    <div class="h2 serif">Roles</div>
                    ${event.Roles.map(item => formatEventRole(item)).join('')}
                </div>
            </tag-tab>
            <tag-tab data-key="#e${event.EventID}-injury">
                <div class="webpage--content-inner">
                    <div class="h2 serif">Injury Levels</div>
                    <div class="h5">Injury Level 0</div>
                    <p>No injuries will occur. Not even a papercut!</p>
                    <div class="h5">Injury Level 1</div>
                    <p>Minor injuries are expected. These sorts of injuries can be easily treated with basic first aid, like a bandaid or a tensor bandage.</p>
                    <div class="h5">Injury Level 2</div>
                    <p>Small injuries are expected. These sorts of injuries will probably need a little more than a first aid kit, but they aren't very serious. The character can go to an urgent care, as the injury is/injuries are non-emergent. Think a few stitches (1 - 10), a sprain, or closed fractures of bones where they're likely to tell you to just "be careful" and maybe buddy wrap it (fingers, toes, tailbone, etc).</p>
                    <div class="h5">Injury Level 3</div>
                    <p>Large injuries are expected. These sorts of injuries might be treatable at an urgent care, but it would depend on the exact urgent care, so you're better off going to the hospital ER! These are larger wounds requiring 10+ stitches, breaks that will need casting or to be reset, dislocations, etc.</p>
                    <div class="h5">Injury Level 4</div>
                    <p>Major injuries are expected. Your character will definitely be going to the hospital - probably in an ambulance! They can expect to be there quite some time and they're likely going to need some kind of surgery, though it may not be a major one!</p>
                    <div class="h5">Injury Level 5</div>
                    <p>Well, shit- your character isn't going to die (unless you want them to), but they <i>are</i> going to have a <i>very</i> bad day and <i>almost</i> die. Expect to be admitted to the hospital, undergo surgery, probably lose a lot of blood... this could take a while to heal from - don't forget to include it in their threads for a while after!</p>
                </div>
            </tag-tab>
            ${showSignup(event) ? `<tag-tab data-key="#e${event.EventID}-signup">
                <div class="webpage--content-inner">
                    <div class="h2 serif">Sign-up</div>
                    ${eventForm(event, members)}
                </div>
            </tag-tab>` : ``}
            <tag-tab data-key="#e${event.EventID}-cast">
                <div class="webpage--content-inner">
                    <div class="h2 serif">Cast List</div>
                    ${formatCastList(cast, event)}
                </div>
            </tag-tab>
        </tag-tabset>
    </tag-tab>`;
}
function formatEventRole(role){
    return `<div class="h5">${role.title}</div>
    <p>${role.overview}</p>`;
}
function formatCastList(characters, event) {
    let entries = [];
    characters.forEach(character => {
        character.EventStats.forEach(entry => {
            entries.push({
                ...character,
                EventStats: {...entry},
            });
        });
    });

    entries.sort((a, b) => {
        if(parseInt(a.EventStats.roleId) < parseInt(b.EventStats.roleId)) {
            return -1;
        } else if(parseInt(a.EventStats.roleId) > parseInt(b.EventStats.roleId)) {
            return 1;
        } else if(a.EventStats.details < b.EventStats.details) {
            return -1;
        } else if(a.EventStats.details > b.EventStats.details) {
            return 1;
        } else if(a.Character < b.Character) {
            return -1;
        } else if(a.Character > b.Character) {
            return 1;
        } else {
            return 0;
        }
    });

    let html = ``;

    event.Roles.forEach(role => {
        let roleCast = entries.filter(item => parseInt(item.EventStats.roleId) === parseInt(role.priority));
        html += `<div class="h5">${capitalize(role.title, [' ', '-'])}</div>`;
        html += `<div class="claims--grid" data-type="grid" data-gap="smsquare">`;
        if(roleCast.length === 0) {
            html += `<div class="claim fullWidth"><span>No sign-ups yet.</span></div>`;
        } else {
            roleCast.forEach(item => {
                let lines = [`Injury Level ${item.EventStats.calcInjury} (max ${item.EventStats.maxInjury}${item.EventStats.kill === 'yes' ? '; permission to kill' : ''})`];
                if(item.EventStats.details) {
                    lines.push(item.EventStats.details);
                }
                lines.push(`Played by <a href="?showuser=${item.ParentID}">${item.Member}</a>`)
                html += formatClaim(item.Character, lines, item.GroupID, `?showuser=${item.AccountID}`);
            });
        }
        html += `</div>`;
    });

    return html;
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
function initCharacterClips(characters) {
    let memberFields = document.querySelectorAll('form #member');
    memberFields.forEach(memberField => {
        memberField.addEventListener('change', e => {
            let form = e.currentTarget.closest('form');
            let member = getSelectValue(e.currentTarget);
            let characterClip = form.querySelector('.clip-characters');
            let memberCharacters = characters.filter(item => parseInt(item.ParentID) === parseInt(member));
            let options = `<option value="">(select)</option>`;
            memberCharacters.forEach(character => {
                options += `<option value="${character.AccountID}">${capitalize(character.Character)}</option>`;
            })
            characterClip.insertAdjacentHTML('beforeend', options);
        });
    });
}
function initOptFields() {
    let roleFields = document.querySelectorAll('form #role');
    roleFields.forEach(field => {
        field.addEventListener('change', e => {
            let form = e.currentTarget.closest('form');
            let role = e.currentTarget.options[e.currentTarget.selectedIndex];
            if(role.dataset.details && role.dataset.details !== '') {
                form.querySelector('.ifOptional > b').innerText = role.dataset.details;
                form.querySelector('.ifOptional').classList.remove('hidden');
            } else {
                form.querySelector('.ifOptional').classList.add('hidden');
            }
        });
    });
}

/***** Event Signup Forms *****/
function eventForm(event, members) {
    members.sort((a, b) => {
        if(a.Member < b.Member) {
            return -1;
        } else if(a.Member > b.Member) {
            return 1;
        } else {
            return 0;
        }
    });
    
    switch(parseInt(event.EventID)) {
        case 1:
            return `<form id="form-e1" data-type="grid" data-columns="2">
                <input type="hidden" id="event" value="ever in your favor" />
                <input type="hidden" id="eventId" value="1" />
                <label>
                    <b>Alias</b>
                    <span><select id="member" class="clip-members" required>
                        <option value="">(select)</option>
                        ${members.map(item => `<option value="${item.AccountID}">${capitalize(item.Member)}</option>`).join('')}
                    </select></span>
                </label>
                <label>
                    <b>Character</b>
                    <span><select id="character" class="clip-characters" required></select></span>
                </label>
                <div class="fullWidth field-wrap">
                    <label>
                        <b>Maximum Injury Level</b>
                        <i>Overall injury level will be randomized within a range, similar to damage in tabletop gaming - but you can pick the cap for your character. What this means is that you may request a maximum level of injury, and the guarantee is that you will be that level of injury <u>or lower.</u> Your character's exact injuries will depend on thread context and can be brought on by you or by staff intervention. You will know your character's anticipated level of injury post-randomization by looking at the cast list.</i>

                        <span><select id="injury" required>
                            <option value="0">No injuries allowed</option>
                            <option value="1">Minor injuries; require basic first aid</option>
                            <option value="2">Small injuries; requires an urgent care</option>
                            <option value="3">Large injuries; requires an emergency room</option>
                            <option value="4">Major Injuries; requires surgery</option>
                            <option value="5">Life-threatening injuries; may result in long-term effects, like maiming</option>
                        </select></span>
                    </label>
                    <div class="form-multiselect fullWidth" data-type="grid" data-gap="sm">
                        <label class="input-wrap">
                            <input type="checkbox" name="kill-perms" value="1">
                            <div class="fancy-input checkbox"><i class="fa-light fa-sharp fa-xmark"></i></div>
                            <strong>You have permission to kill my character, if it seems likely or necessary based on context. (OPTIONAL)</strong>
                        </label>
                        <label class="input-wrap">
                            <input type="checkbox" name="magic-perms" value="1" required>
                            <div class="fancy-input checkbox"><i class="fa-light fa-sharp fa-xmark"></i></div>
                            <strong>I acknowledge that by participating in this event, my character's magical strength may lessen temporarily or permanently. (REQUIRED)</strong>
                        </label>
                    </div>
                </div>
                <label class="fullWidth">
                    <b>Role</b>
                    <span><select id="role" required>
                        <option value="">(select)</option>
                        ${event.Roles.map(item => `<option value="${item.priority}" data-details="${item.details}">${capitalize(item.title)}</option>`).join('')}
                    </select></span>
                </label>
                <label class="hidden fullWidth ifOptional">
                    <b></b>
                    <span><input type="text" id="details" placeholder="Details" /></span>
                </label>
                <label class="fullWidth">
                    <b>Specific Requests</b>
                    <i>Visible to staff only; if there is any specific goal you have in mind for your character, or definite no-gos when it comes to staff intervention in the event, please let us know now.</i>
                    <u>NO CHARACTERS WILL BE KILLED WITHOUT EXPRESS PERMISSION REGARDLESS. PLEASE DO NOT USE THIS FIELD TO REQUEST WE NOT KILL YOUR CHARACTER. WE ALREADY WON'T, UNLESS NOTED ABOVE.</u>
                    <span><textarea id="requests" placeholder="Requests"></textarea></span>
                </label>
                <button type="submit" id="submit" class="fullWidth">Submit</button>
            </form>`;
        case 2:
            return `<form id="form-e2" data-type="grid" data-columns="2">
                <input type="hidden" id="event" value="game of survival" />
                <input type="hidden" id="eventId" value="2" />
                <label>
                    <b>Alias</b>
                    <span><select id="member" class="clip-members" required>
                        <option value="">(select)</option>
                        ${members.map(item => `<option value="${item.AccountID}">${capitalize(item.Member)}</option>`).join('')}
                    </select></span>
                </label>
                <label>
                    <b>Character</b>
                    <span><select id="character" class="clip-characters" required></select></span>
                </label>
                <div class="fullWidth field-wrap">
                    <label>
                        <b>Maximum Injury Level</b>
                        <i>Overall injury level will be randomized within a range, similar to damage in tabletop gaming - but you can pick the cap for your character. What this means is that you may request a maximum level of injury, and the guarantee is that you will be that level of injury <u>or lower.</u> Your character's exact injuries will depend on thread context and can be brought on by you or by staff intervention. You will know your character's anticipated level of injury post-randomization by looking at the cast list.</i>

                        <span><select id="injury" required>
                            <option value="0">No injuries allowed</option>
                            <option value="1">Minor injuries; require basic first aid</option>
                            <option value="2">Small injuries; requires an urgent care</option>
                            <option value="3">Large injuries; requires an emergency room</option>
                            <option value="4">Major Injuries; requires surgery</option>
                            <option value="5">Life-threatening injuries; may result in long-term effects, like maiming</option>
                        </select></span>
                    </label>
                    <div class="form-multiselect fullWidth" data-type="grid" data-gap="sm">
                        <label class="input-wrap">
                            <input type="checkbox" name="kill-perms" value="1">
                            <div class="fancy-input checkbox"><i class="fa-light fa-sharp fa-xmark"></i></div>
                            <strong>You have permission to kill my character, if it seems likely or necessary based on context. (OPTIONAL)</strong>
                        </label>
                        <label class="input-wrap">
                            <input type="checkbox" name="magic-perms" value="1" required>
                            <div class="fancy-input checkbox"><i class="fa-light fa-sharp fa-xmark"></i></div>
                            <strong>I acknowledge that by participating in this event, my character's magical strength may lessen temporarily or permanently. (REQUIRED)</strong>
                        </label>
                    </div>
                </div>
                <label class="fullWidth">
                    <b>Role</b>
                    <span><select id="role" required>
                        <option value="">(select)</option>
                        ${event.Roles.map(item => `<option value="${item.priority}" data-details="${item.details}">${capitalize(item.title)}</option>`).join('')}
                    </select></span>
                </label>
                <label class="hidden fullWidth ifOptional">
                    <b></b>
                    <span><input type="text" id="details" placeholder="Details" /></span>
                </label>
                <label class="fullWidth">
                    <b>Specific Requests</b>
                    <i>Visible to staff only; if there is any specific goal you have in mind for your character, or definite no-gos when it comes to staff intervention in the event, please let us know now.</i>
                    <u>NO CHARACTERS WILL BE KILLED WITHOUT EXPRESS PERMISSION REGARDLESS. PLEASE DO NOT USE THIS FIELD TO REQUEST WE NOT KILL YOUR CHARACTER. WE ALREADY WON'T, UNLESS NOTED ABOVE.</u>
                    <span><textarea id="requests" placeholder="Requests"></textarea></span>
                </label>
                <button type="submit" id="submit" class="fullWidth">Submit</button>
            </form>`;
        default:
            return `No form`;
        
    }
}
function initSignups(characters) {
    /***** Event One *****/
    let e1Form = document.querySelector('#form-e1');
    if(e1Form) {
        e1Form.addEventListener('submit', e => {
            e.preventDefault();
    
            let form = e.currentTarget,
            event = form.querySelector('#event'),
            eventId = form.querySelector('#eventId'),
            member = form.querySelector('#member'),
            character = form.querySelector('#character'),
            role = form.querySelector('#role'),
            details = form.querySelector('#details'),
            injury = form.querySelector('#injury'),
            killPerms = form.querySelector('.input-wrap input[name="kill-perms"]'),
            requests = form.querySelector('#requests');

            let existing = characters
                            .filter(item => parseInt(item.AccountID) === parseInt(getSelectValue(character)))
                            .map(item => ({...item, EventStats: item.EventStats && item.EventStats !== '' ? JSON.parse(item.EventStats) : []}))[0];
    
            let newEventStats = {
                event: getValue(event),
                eventId: getValue(eventId),
                role: getSelectText(role),
                roleId: getSelectValue(role),
                details: getStandardValue(details),
                maxInjury: getSelectValue(injury),
                calcInjury: getSelectValue(injury) !== 0 ? Math.floor(Math.random() * getSelectValue(injury)) + 1 : 0,
                kill: killPerms.checked ? 'yes' : 'no',
                requests: getValue(requests),
            }
            let data = {
                DeployID: deployID.claims,
                SubmissionType: 'event-signup',
                AccountID: getSelectValue(character),
                EventStats: JSON.stringify([...existing.EventStats, newEventStats])
            }
    
            let staffDiscord = {
                title: `${capitalize(getSelectText(character)).trim()} (Played by ${capitalize(getSelectText(member), [' ', '-']).trim()}) has signed up for ${capitalize(newEventStats.event, [' ', '-']).trim()}`,
                text: `They are part of the ${capitalize(newEventStats.role, [' ', '-']).trim()} group${newEventStats.details !== '' ? ` (${capitalize(newEventStats.details, [' ', '-']).trim()})` : ''}.

**Can kill?** ${capitalize(newEventStats.kill)}${newEventStats.requests !== '' ? `\n**Specific Requests:** \n${newEventStats.requests}` : ''}`,
                hook: eventSignupLogs,
            }
    
            setFormStatus(form);
    
            sendAjax(form, data, staffDiscord);
        });
    }

    /***** Event Two *****/
    let e2Form = document.querySelector('#form-e2');
    if(e2Form) {
        e2Form.addEventListener('submit', e => {
            e.preventDefault();
    
            let form = e.currentTarget,
            event = form.querySelector('#event'),
            eventId = form.querySelector('#eventId'),
            member = form.querySelector('#member'),
            character = form.querySelector('#character'),
            role = form.querySelector('#role'),
            details = form.querySelector('#details'),
            injury = form.querySelector('#injury'),
            killPerms = form.querySelector('.input-wrap input[name="kill-perms"]'),
            requests = form.querySelector('#requests');

            let existing = characters
                            .filter(item => parseInt(item.AccountID) === parseInt(getSelectValue(character)))
                            .map(item => ({...item, EventStats: item.EventStats && item.EventStats !== '' ? JSON.parse(item.EventStats) : []}))[0];
    
            let newEventStats = {
                event: getValue(event),
                eventId: getValue(eventId),
                role: getSelectText(role),
                roleId: getSelectValue(role),
                details: getStandardValue(details),
                maxInjury: getSelectValue(injury),
                calcInjury: getSelectValue(injury) !== 0 ? Math.floor(Math.random() * getSelectValue(injury)) + 1 : 0,
                kill: killPerms.checked ? 'yes' : 'no',
                requests: getValue(requests),
            }
            let data = {
                DeployID: deployID.claims,
                SubmissionType: 'event-signup',
                AccountID: getSelectValue(character),
                EventStats: JSON.stringify([...existing.EventStats, newEventStats])
            }
    
            let staffDiscord = {
                title: `${capitalize(getSelectText(character)).trim()} (Played by ${capitalize(getSelectText(member), [' ', '-']).trim()}) has signed up for ${capitalize(newEventStats.event, [' ', '-']).trim()}`,
                text: `They are part of the ${capitalize(newEventStats.role, [' ', '-']).trim()} group${newEventStats.details !== '' ? ` (${capitalize(newEventStats.details, [' ', '-']).trim()})` : ''}.

**Can kill?** ${capitalize(newEventStats.kill)}${newEventStats.requests !== '' ? `\n**Specific Requests:** \n${newEventStats.requests}` : ''}`,
                hook: eventSignupLogs,
            }
    
            setFormStatus(form);
    
            sendAjax(form, data, staffDiscord);
        });
    }
}

const eventExtras = {
    'game of survival': `<p>This event is running as a mixture of <u>flavour</u> and <u>staff interaction</u>. There will be no pre-defined groups, thread goals, or rounds. You should post as usual. If you wish for a thread to have staff intervention, either tag <u>@event staff</u> for a thread outside of the event board (so long as the thread is held between the start and end date of the event!) <u>or</u> post your thread in the <a href="?showforum=97">event board</a>. All threads in the event board are assumed to be within the start and end dates of the event.</p>
    <div class="h5">You can expect:</div>
    <ul>
        <li>Staff to intervene at random in event board threads.</li>
        <li>Staff to intervene at request in tagged threads.</li>
        <li>Interventions will have an <u>effect</u>. No exceptions, save mercy from the dice.</li>
        <li>Staff will roll dice for you as necessary for magical strength effects (physical contact with a fiend). If you request or post in the event board, you have implicitly agreed to this without the staff checking as you are willingly participating in the event.</li>
        <li>Staff <u>will not</u> commit physical contact actions that cause actual damage (even a papercut's worth) without checking. Injury levels are generally considered to be up to the member to meet, even with signed-up characters who are agreeing to the chance of physical injury.</li>
    </ul>`,
};