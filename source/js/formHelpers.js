/***** Faces *****/
function checkClaims(form, data, type, staffDiscord = null, publicDiscord = null) {
    switch(type) {
        case 'subplot':
            let staticPlotReserves = [];
            fetch(fetchURL(plotReservesJson))
            .then((response) => response.json())
            .then((plotReserveData) => {
                staticPlotReserves = [...plotReserveData];
            }).then(() => {
                let createdRoles = staticClaims.filter(item => item.Roles && item.Roles !== '' && JSON.parse(item.Roles).length > 0);
                let individualClaims = [], existing = [];
                createdRoles.forEach(character => {
                    let roles = JSON.parse(character.Roles);
                    roles.forEach(role => {
                        individualClaims.push(role);
                    });
                });
                individualClaims.forEach(claim => {
                    if(claim.plot === data.Plot && claim.section == data.Section && claim.role === data.Role) {
                        existing.push(claim);
                    }
                })
                let plot = staticSubplots.filter(item => item.Plot === data.Plot)[0];
                if(plot) {
                    let sections = JSON.parse(plot.Sections);
                    let activeSection = sections.filter(item => item.title === data.Section)[0];
                    if(activeSection) {
                        let roles = activeSection.roles;
                        let activeRole = roles.filter(item => item.role === data.Role)[0];
                        if(activeRole) {
                            if(activeRole.limit === 'unlimited') {
                                console.log('send ajax');
                                sendAjax(form, data, staffDiscord, publicDiscord);
                            } else {
                                let limit = parseInt(activeRole.limit);
                                if(existing.length >= limit) {
                                    handleWarning(form, claimExists);
                                } else {
                                    let existingPlotReserves = staticPlotReserves.filter(item => item.Plot === data.Plot && item.Section === data.Section && item.Role === data.Role);
                                    if(existingPlotReserves.length > 0) {
                                        checkReserves(existingPlotReserves, form, data, staffDiscord, publicDiscord, existing.length, limit);
                                    } else {
                                        console.log('send ajax');
                                        sendAjax(form, data, staffDiscord, publicDiscord);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            break;
        case 'canon':
            let staticCanonReserves = [];
            fetch(fetchURL(combinedReservesJson))
            .then((response) => response.json())
            .then((canonReserveData) => {
                staticCanonReserves = [...canonReserveData.filter(item => item.Type === 'canon')];
            }).then(() => {
                let createdCanons = staticCanons.filter(item => item.Canon === data.Reserve && item.Status === 'claimed');
                if(createdCanons.length > 0) {
                    handleWarning(form, claimExists);
                } else {
                    let existing = staticCanonReserves.filter(item => item.Reserve === data.Reserve);
                    if(existing.length > 0) {
                        checkReserves(existing, form, data, staffDiscord, publicDiscord);
                    } else {
                        console.log('send ajax');
                        sendAjax(form, data, staffDiscord, publicDiscord);
                    }
                }
            });
            break;
        case 'face':
            let staticFaceReserves = [];
            fetch(fetchURL(combinedReservesJson))
            .then((response) => response.json())
            .then((faceReserveData) => {
                staticFaceReserves = [...faceReserveData.filter(item => item.Type === 'face')];
            }).then(() => {
                let createdFaces = staticClaims.filter(item => item.Face === data.Reserve);
                if(createdFaces.length > 0) {
                    handleWarning(form, claimExists);
                } else {
                    let existing = staticFaceReserves.filter(item => item.Reserve === data.Reserve);
                    if(existing.length > 0) {
                        checkReserves(existing, form, data, staffDiscord, publicDiscord);
                    } else {
                        console.log('send ajax');
                        sendAjax(form, data, staffDiscord, publicDiscord);
                    }
                }
            });
            break;
        case 'deity':
            let staticDeityReserves = [];
            fetch(fetchURL(combinedReservesJson))
            .then((response) => response.json())
            .then((reserveData) => {
                staticDeityReserves = [...reserveData.filter(item => item.Type === 'deity')];
            }).then(() => {
                let createdDeities = staticClaims.filter(item => item.Character === data.Reserve.split(' of the ')[0]);
                if(createdDeities.length > 0) {
                    handleWarning(form, claimExists);
                } else {
                    let existing = staticDeityReserves.filter(item => item.Reserve === data.Reserve);
                    console.log(existing);
                    if(existing.length > 0) {
                        checkReserves(existing, form, data, staffDiscord, publicDiscord);
                    } else {
                        console.log('send ajax');
                        sendAjax(form, data, staffDiscord, publicDiscord);
                    }
                }
            });
            break;
        case 'reincarnation':
            let staticReincarnationReserves = [];
            fetch(fetchURL(combinedReservesJson))
            .then((response) => response.json())
            .then((reserveData) => {
                staticReincarnationReserves = [...reserveData.filter(item => item.Type === 'reincarnation')];
            }).then(() => {
                let createdReincarnations = staticClaims.filter(item => item.Reincarnation === data.Reserve);
                if(createdReincarnations.length > 0) {
                    handleWarning(form, claimExists);
                } else {
                    let existing = staticReincarnationReserves.filter(item => item.Reserve === data.Reserve);
                    if(existing.length > 0) {
                        checkReserves(existing, form, data, staffDiscord, publicDiscord);
                    } else {
                        console.log('send ajax');
                        sendAjax(form, data, staffDiscord, publicDiscord);
                    }
                }
            });
            break;
        default:
            break;
    }
}
function checkReserves(existing, form, data, staffDiscord = null, publicDiscord = null, preexisting = null, limit = null) {
    let oldReserves = [], existingCount = existing.length;
    existing.forEach((reserve, i) => {
        let difference = checkActiveReserve(reserve.Timestamp);
        console.log('run check');
        if(difference < (defaultReserve + parseInt(reserve.Extension))) {
            handleWarning(form, activeResExists);
        } else {
            oldReserves.push(reserve);
            existingCount--;
        }
    });
    if((preexisting && (existingCount + preexisting) > limit) || (!preexisting && existingCount > 0)) {
        handleWarning(form, instancesCapped);
    } else {
        oldReserves.forEach(reserve => {
            if(reserve.Member === data.Member) {
                handleWarning(form, prevResExists);
            } else {
                console.log('send ajax');
                sendAjax(form, data, staffDiscord, publicDiscord);
            }
        });
    }
}

/***** Edit Member *****/
function editMember(form, data) {
    fetch(fetchURL(membersJson))
    .then((response) => response.json())
    .then((claimsData) => {
        let existing = claimsData.filter(item => item.AccountID === data.AccountID);

        //if member exists
        if(existing.length === 1) {
            existing = existing[0];
            let original = {...existing};
            let initialMessage = ``, changeMessage = ``;

            if(data.selectedChanges.includes('alias')) {
                existing.Member = data.Alias;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Alias:** ${capitalize(original.Member, [' ', '-'])}`;
                changeMessage += `**Alias:** ${capitalize(existing.Member, [' ', '-'])}`;
            }
    
            if(data.selectedChanges.includes('pronouns')) {
                existing.Pronouns = data.Pronouns;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Pronouns:** ${original.Pronoun}`;
                changeMessage += `**Pronouns:** ${existing.Pronouns}`;
            }
    
            if(data.selectedChanges.includes('age')) {
                existing.Age = data.Age;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Age:** ${original.Age}`;
                changeMessage += `**Age:** ${existing.Age}`;
            }
    
            if(data.selectedChanges.includes('timezone')) {
                existing.Timezone = data.Timezone;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Timezone:** ${original.Timezone}`;
                changeMessage += `**Timezone:** ${existing.Timezone}`;
            }
    
            if(data.selectedChanges.includes('about')) {
                existing.About = data.About;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**About:**
                > ${original.About}\n`;
                changeMessage += `**About:**
                > ${existing.About}\n`;
            }
    
            if(data.selectedChanges.includes('triggers')) {
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
    
            if(data.selectedChanges.includes('ratings')) {
                existing.Language = data.Language;
                existing.Sex = data.Sex;
                existing.Violence = data.Violence;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Ratings:** ${original.Language}-${original.Sex}-${original.Violence}`;
                changeMessage += `**Ratings:** ${existing.Language}-${existing.Sex}-${existing.Violence}`;
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
            existing.DeployID = data.DeployID;

            sendAjax(form, existing, staffDiscord);
        }
            
    });
}

/***** Edit Character *****/
function pullCharacterClaims(field) {
    let entered = getSelectValue(field);
    let existing = staticClaims.filter(item => item.AccountID === entered);
    let form = field.closest('form');

    if(existing.length > 0) {
        let character = existing[0];
        if(character.Jobs && character.Jobs !== '') {
            form.querySelectorAll('.ifJobChange, .ifJobRemove').forEach(item => {
                if(item.querySelector('blockquote')) {
                    item.querySelector('blockquote').remove();
                }
            });
            form.querySelector('#clip-job-change').innerHTML = formatJobChanges(character);
            form.querySelector('#clip-job-remove').innerHTML = formatJobRemoval(character);
        } else {
            form.querySelectorAll('.ifJobChange, .ifJobRemove').forEach(item => {
                if(item.querySelector('blockquote')) {
                    item.querySelector('blockquote').innerText = 'This character is not currently employed.';
                } else {
                    item.insertAdjacentHTML('beforeend', `<blockquote>This character is not currently employed.</blockquote>`)
                }
            });
        }
        if(character.Roles && character.Roles !== '') {
            form.querySelectorAll('.ifRoleRemove').forEach(item => {
                if(item.querySelector('blockquote')) {
                    item.querySelector('blockquote').remove();
                }
            });
            form.querySelector('#clip-role-remove').innerHTML = formatRoleRemoval(character);
        } else {
            form.querySelectorAll('.ifRoleRemove').forEach(item => {
                if(item.querySelector('blockquote')) {
                    item.querySelector('blockquote').innerText = 'This character is not currently part of a subplot.';
                } else {
                    item.insertAdjacentHTML('beforeend', `<blockquote>This character is not currently part of a subplot.</blockquote>`)
                }
            });
        }
    } else {
        form.querySelectorAll('.ifRoleRemove, .ifJobChange, .ifJobRemove').forEach(item => {
            if(item.querySelector('blockquote')) {
                item.querySelector('blockquote').innerText = 'There are no submitted characters matching the profile entered. Please confirm you have entered a profile correctly in the field above.';
            } else {
                item.insertAdjacentHTML('beforeend', `<blockquote>There are no submitted characters matching the profile entered. Please confirm you have entered a profile correctly in the field above.</blockquote>`)
            }
            item.querySelector('div').innerHTML = ``;
        });
    }
}
function editCharacter(form, data) {
    let existing = staticClaims.filter(item => item.AccountID === data.AccountID);

    //if member exists
    if(existing.length === 1) {
    
        existing = existing[0];
        let original = {...existing};
        let initialMessage = ``, changeMessage = ``;

        if(data.selectedChanges.includes('character')) {
            existing.Character = data.Character;
            if(initialMessage !== '') {
                initialMessage += `\n`;
                changeMessage += `\n`;
            }
            initialMessage += `**Name:** ${capitalize(original.Character)}`;
            changeMessage += `**Name:** ${capitalize(existing.Character)}`;
        }

        if(data.selectedChanges.includes('group')) {
            existing.Group = data.Group;
            existing.GroupID = data.GroupID;
            if(initialMessage !== '') {
                initialMessage += `\n`;
                changeMessage += `\n`;
            }
            initialMessage += `**Group:** ${capitalize(original.Group, [' ', '-'])}`;
            changeMessage += `**Group:** ${capitalize(existing.Group, [' ', '-'])}`;
        }
        
        if(data.selectedChanges.includes('jobs-add') || data.selectedChanges.includes('jobs-change') || data.selectedChanges.includes('jobs-remove')) {
            let jobsArray = original.Jobs && original.Jobs !== '' ? JSON.parse(original.Jobs) : [];
            
            //remove jobs first
            if(data.selectedChanges.includes('jobs-remove')) {
                let removedJobs = Array.prototype.slice.call(form.querySelectorAll('[name="remove-job"]'))
                    .filter(item => item.checked)
                    .map(item => ({
                        employer: item.dataset.employer,
                        section: item.dataset.section,
                        position: item.dataset.position,
                    }));
                
                removedJobs.forEach(removedJob => {
                    jobsArray.forEach(existingJob => {
                        if(cleanText(existingJob.employer) === removedJob.employer && cleanText(existingJob.section) === removedJob.section && cleanText(existingJob.position) === removedJob.position) {
                            existingJob.employer = 'remove';
                            existingJob.section = 'remove';
                            existingJob.position = 'remove';
                        }
                    });
                });

                jobsArray = jobsArray.filter(item => item.employer !== 'remove' && item.section !== 'remove' && item.position !== 'remove');
            }

            //then edit existing jobs
            if(data.selectedChanges.includes('jobs-change')) {
                let editedJobs = Array.prototype.slice.call(form.querySelectorAll('#clip-job-change .job-row'));

                editedJobs.forEach(editJob => {
                    jobsArray.forEach(job => {
                        if(cleanText(job.employer) === editJob.dataset.employer && cleanText(job.section) === editJob.dataset.section && cleanText(job.position) === editJob.dataset.position) {
                            let newSection = editJob.querySelector('.job-section input').value.toLowerCase().trim();
                            let newPosition = editJob.querySelector('.position input').value.toLowerCase().trim();
                            if(cleanText(job.section) !== cleanText(newSection) && newSection !== '') {
                                job.section = newSection;
                            }
                            if(cleanText(job.position) !== cleanText(newPosition) && newPosition !== '') {
                                job.position = newPosition;
                            }
                        }
                    });
                });
            }

            //then add new jobs
            if(data.selectedChanges.includes('jobs-add')) {
                let addedJobs = form.querySelectorAll('.job-wrap');
                addedJobs.forEach(job => {
                    jobsArray.push({
                        employer: getSelectText(job.querySelector('.employer select')),
                        section: job.querySelector('.job-section input').value.toLowerCase().trim(),
                        position: job.querySelector('.position input').value.toLowerCase().trim(),
                    });
                });
            }
            
            existing.Jobs = JSON.stringify(jobsArray);

            if(initialMessage !== '') {
                initialMessage += `\n`;
                changeMessage += `\n`;
            }
            initialMessage += `**Previous Jobs:**\n`;
            if(original.Jobs.length) {
                JSON.parse(original.Jobs).forEach(job => {
                    if(job.section && job.section.trim() !== '') {
                        initialMessage += `${job.employer} - ${job.section} - ${job.position}\n`;
                    } else {
                        initialMessage += `${job.employer} - ${job.position}\n`;
                    }
                });
            } else {
                initialMessage += `Unemployed`;
            }

            changeMessage += `**Updated Jobs:**\n`;
            JSON.parse(existing.Jobs).forEach(job => {
                if(job.section && job.section.trim() !== '') {
                    changeMessage += `${job.employer} - ${job.section} - ${job.position}\n`;
                } else {
                    changeMessage += `${job.employer} - ${job.position}\n`;
                }
            });
        }

        if(data.selectedChanges.includes('roles-add') || data.selectedChanges.includes('roles-remove')) {
            let rolesArray = original.Roles && original.Roles !== '' ? JSON.parse(original.Roles) : [];
            
            //remove roles first
            if(data.selectedChanges.includes('roles-remove')) {
                let removedRoles = Array.prototype.slice.call(form.querySelectorAll('[name="remove-role"]'))
                    .filter(item => item.checked)
                    .map(item => ({
                        plot: item.dataset.plot,
                        section: item.dataset.section,
                        role: item.dataset.role,
                    }));
                
                    removedRoles.forEach(removedRole => {
                    rolesArray.forEach(existingRole => {
                        if(existingRole.plot === removedRole.plot && existingRole.section === removedRole.section && existingRole.role === removedRole.role) {
                            existingRole.plot = 'remove';
                            existingRole.section = 'remove';
                            existingRole.role = 'remove';
                        }
                    });
                });

                rolesArray = rolesArray.filter(item => item.plot !== 'remove' && item.section !== 'remove' && item.role !== 'remove');
            }

            //then add new roles
            if(data.selectedChanges.includes('roles-add')) {
                let addedRoles = form.querySelectorAll('.role-wrap');
                addedRoles.forEach(addedRole => {
                    rolesArray.push({
                        plot: getSelectText(addedRole.querySelector('.plot select')),
                        section: getSelectText(addedRole.querySelector('.plot-section select')),
                        role: getSelectText(addedRole.querySelector('.role select')),
                    });
                });
            }
            
            existing.Roles = JSON.stringify(rolesArray);

            if(initialMessage !== '') {
                initialMessage += `\n`;
                changeMessage += `\n`;
            }
            initialMessage += `**Previous Roles:**\n`;
            if(original.Roles && original.Roles !== '') {
                JSON.parse(original.Roles).forEach(role => {
                    initialMessage += `${role.plot} - ${role.section} - ${role.role}\n`;
                });
            }

            changeMessage += `**Updated Roles:**\n`;
            JSON.parse(existing.Roles).forEach(role => {
                changeMessage += `${role.plot} - ${role.section} - ${role.role}\n`;
            });
        }

        let staffDiscord = {
            title: `Character Claims Editted: ${capitalize(original.Character)}`,
            text: `Initial Values
            ----------
            ${initialMessage}
            
            New Values
            ----------
            ${changeMessage}`,
            hook: claimLogs,
            color: rgbToHex(colors[existing.Group][0], colors[existing.Group][1], colors[existing.Group][2]),
        }

        let successMessage = `<blockquote class="fullWidth">Submission successful!</blockquote>
        <button onclick="reloadForm(this)" type="button" class="fullWidth submit">Back to form</button>`;

        existing.SubmissionType = data.SubmissionType;
        existing.DeployID = data.DeployID;

        sendAjax(form, existing, successMessage, staffDiscord);
    }

    return false;
}

/***** Edit Business *****/
function editBusiness(form, data) {
    fetch(fetchURL(businessesJson))
    .then((response) => response.json())
    .then((claimsData) => {
        let existing = claimsData.filter(item => item.Employer === data.Employer);

        //if business exists
        if(existing.length === 1) {
            existing = existing[0];
            let original = {...existing};
            let initialMessage = ``, changeMessage = ``;

            if(data.selectedChanges.includes('wanted')) {
                existing.Wanted = data.Wanted;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Wanted Ad:** ${original.Wanted}`;
                changeMessage += `**Wanted Ad:** ${existing.Wanted}`;
            }

            if(data.selectedChanges.includes('hiring')) {
                existing.Hiring = data.Hiring;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Hiring:** ${original.Hiring}`;
                changeMessage += `**Hiring:** ${existing.Hiring}`;
            }

            if(data.selectedChanges.includes('hours')) {
                existing.Hours = data.Hours;
                if(initialMessage !== '') {
                    initialMessage += `\n`;
                    changeMessage += `\n`;
                }
                initialMessage += `**Hours:**\n`;
                if(original.Hours && original.Hours !== '') {
                    JSON.parse(original.Hours).forEach(set => {
                        if(set.range) {
                            initialMessage += `${set.range} (${set.time})`;
                        } else {
                            initialMessage += `${set.text}`;
                        }
                    });
                }
                changeMessage += `**Hours:**\n`;
                JSON.parse(existing.Hours).forEach(set => {
                    if(set.range) {
                        changeMessage += `${set.range} (${set.time})`;
                    } else {
                        changeMessage += `${set.text}`;
                    }
                });
            }

            let staffDiscord = {
                title: `Business Editted: ${capitalize(original.Employer, [' ', '-'])}`,
                text: `Initial Values
                ----------
                ${initialMessage}
                
                New Values
                ----------
                ${changeMessage}`,
                hook: businessLogs,
            }

            existing.SubmissionType = data.SubmissionType;
            existing.DeployID = data.DeployID;

            sendAjax(form, existing, staffDiscord);
        }
            
    });
}