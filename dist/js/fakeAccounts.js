/*member list row template:

var age = calculateAge({
    'year': `<!-- |field_13| -->`,
    'month': `<!-- |field_14| -->`,
    'day': `<!-- |field_15| -->`,
});

var ageClass = setAgeClass(age);

var accountType = `<!-- |field_1| -->`.toLowerCase();
if(staffGroups.includes(parseInt(`<!-- |g_id| -->`))) {
    accountType = `staff`;
}
if(accountType === `member`) {
    accountType = `writer`;
}

accounts.push({
    universal: {
        name: standardizeLower(`<!-- |member_name| -->`),
        id: parseInt(`<!-- |id| -->`),
        groupID: parseInt(`<!-- |g_id| -->`),
        groupName: standardizeLower(`<!-- |group| -->`),
        imageWide: `<!-- |field_18| -->`,
        type: standardizeLower(accountType),
        parentID: parseInt(`<!-- |parent_id| -->`),
        posts: parseInt(`<!-- |posts| -->`),
        dates: {
            joined: `<!-- |joined| -->`,
            lastActive: `<!-- |last_activity| -->`,
            lastPost: `<!-- |last_post| -->`
        }
    },
    character: {
        pronouns: standardizeLower(`<!-- |field_24| -->`),
        relationship: standardizeLower(`<!-- |field_25| -->`),
        relationshipClass: standardizeLower(cleanText(`<!-- |field_25| -->`)),
        age: age,
        ageClass: ageClass,
        location: standardizeLower(`<!-- |field_26| -->`),
        locationClass: standardizeLower(cleanText(`<!-- |field_26| -->`)),
        overview: `<!-- |field_27| -->`,
    },
    writer: {
        aliasClass: standardizeLower(cleanText(`<!-- |field_3| -->`)),
        alias: standardizeLower(`<!-- |field_3| -->`),
        age: parseInt(`<!-- |field_19| -->`),
        pronouns: standardizeLower(`<!-- |field_20| -->`),
        timezone: standardizeLower(`<!-- |field_21| -->`),
        contact: standardizeLower(`<!-- |field_22| -->`),
        triggers: `<!-- |field_23| -->`,
    }
});

*/


const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const imageTall = `https://picsum.photos/500/800`;
const imageWide = `https://picsum.photos/800/500`;
const imageSquare = `https://picsum.photos/250`;

accounts = [
    {
        universal: {
            name: standardizeLower(`Lux`),
            id: parseInt(`1`),
            groupID: parseInt(`4`),
            groupName: standardizeLower(`Admin`),
            image: imageSquare,
            type: standardizeLower(`Writer`),
            parentID: parseInt(`0`),
            posts: parseInt(`1000`),
            dates: {
                joined: `August 7, 2022`,
                lastActive: `August 7, 2022`,
                lastPost: `August 7, 2022`
            }
        },
        character: {
            pronouns: standardizeLower(``),
            age: `` !== `` ? parseInt(``) : -1,
            ageClass: ``,
            ancestry: standardizeLower(``),
            detail1: standardizeLower(``),
            detail2: standardizeLower(``),
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Lux`)),
            alias: standardizeLower(`Lux`),
            age: parseInt(`32`),
            pronouns: standardizeLower(`she/her`),
            timezone: standardizeLower(`GMT-04:00`),
        }
    },
    {
        universal: {
            name: standardizeLower(`Spyder`),
            id: parseInt(`2`),
            groupID: parseInt(`4`),
            groupName: standardizeLower(`Admin`),
            image: imageSquare,
            type: standardizeLower(`Writer`),
            parentID: parseInt(`0`),
            posts: parseInt(`100`),
            dates: {
                joined: `August 7, 2022`,
                lastActive: `August 7, 2022`,
                lastPost: `August 7, 2022`
            }
        },
        character: {
            pronouns: standardizeLower(``),
            age: `` !== `` ? parseInt(``) : -1,
            ageClass: ``,
            ancestry: standardizeLower(``),
            detail1: standardizeLower(``),
            detail2: standardizeLower(``),
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Spyder`)),
            alias: standardizeLower(`Spyder`),
            age: parseInt(`26`),
            pronouns: standardizeLower(`They/Them`),
            timezone: standardizeLower(`GMT-05:00`),
        }
    },
    {
        universal: {
            name: standardizeLower(`Fiore Amoretti`),
            id: parseInt(`3`),
            groupID: parseInt(`7`),
            groupName: standardizeLower(`Group Seven`),
            image: imageSquare,
            type: standardizeLower(`Character`),
            parentID: parseInt(`1`),
            posts: parseInt(`567`),
            dates: {
                joined: `August 7, 2023`,
                lastActive: `August 7, 2023`,
                lastPost: `August 7, 2023`
            }
        },
        character: {
            pronouns: standardizeLower(`He/Him`),
            age: `170` !== `` ? parseInt(`170`) : -1,
            ageClass: `101500 immortal`,
            ancestry: standardizeLower(`Spirit`),
            detail1: standardizeLower(`Mind`),
            detail2: standardizeLower(`Inspiration`),
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Lux`)),
            alias: standardizeLower(`Lux`),
            age: parseInt(`32`),
            pronouns: standardizeLower(`she/her`),
            timezone: standardizeLower(`GMT-04:00`),
        }
    },
    {
        universal: {
            name: standardizeLower(`Emily Lawry`),
            id: parseInt(`4`),
            groupID: parseInt(`8`),
            groupName: standardizeLower(`Group Eight`),
            image: imageSquare,
            type: standardizeLower(`Character`),
            parentID: parseInt(`2`),
            posts: parseInt(`652`),
            dates: {
                joined: `August 9, 2022`,
                lastActive: `August 9, 2022`,
                lastPost: `August 9, 2022`
            }
        },
        character: {
            pronouns: standardizeLower(`She/her`),
            age: `31` !== `` ? parseInt(`31`) : -1,
            ageClass: `2635 mortal`,
            ancestry: standardizeLower(`Mortal`),
            detail1: standardizeLower(``),
            detail2: standardizeLower(``),
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Spyder`)),
            alias: standardizeLower(`Spyder`),
            age: parseInt(`26`),
            pronouns: standardizeLower(`They/Them`),
            timezone: standardizeLower(`GMT-05:00`),
        }
    },
];