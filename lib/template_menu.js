const fs = require('fs')
const chalk = require('chalk');
const moment = require('moment-timezone');
const { pickRandom } = require('./function');

async function setTemplateMenu(naze, type, m, prefix, setv, db, options = {}) {
	const hari = moment.tz('Asia/Jakarta').locale('id').format('dddd');
	const tanggal = moment.tz('Asia/Jakarta').locale('id').format('DD/MM/YYYY');
	const jam = moment.tz('Asia/Jakarta').locale('id').format('HH:mm:ss');
	const ucapanWaktu = jam < '05:00:00' ? 'I have bought a property in jawa 🌉' : jam < '11:00:00' ? 'Shut up Bitc* 🌄' : jam < '15:00:00' ? 'Sup Dude 🏙' : jam < '18:00:00' ? 'The future is a void without promise 🌅' : jam < '19:00:00' ? 'Shut up nigga 🌃' : jam < '23:59:00' ? 'Shut up Nigga 🌌' : 'Shut up Nigga 🌌';
	
	let total = Object.entries(db.hit).sort((a, b) => b[1] - a[1]).slice(0, Math.min(7, Object.keys(db.hit).length)).filter(([command]) => command !== 'totalcmd' && command !== 'todaycmd').slice(0, 5);
	
	let text = `╭──❍「 *TOP MENU TYPE SHI AF* 」❍\n`
	
	if (total && total.length >= 5) {
		total.forEach(([command, hit], index) => {
			text += `│${setv} ${prefix}${command}: ${hit} hits\n`
		})
		text += '╰──────❍'
	} else text += `│${setv} ${prefix}gemini
│${setv} ${prefix}brat
│${setv} ${prefix}rvo
│${setv} ${prefix}ytmp4
│${setv} ${prefix}ytmp3
╰──────❍`

	if (type == 1 || type == 'buttonMessage') {
		await naze.sendButtonMsg(m.chat, {
			text: `Halo @${m.sender.split('@')[0]}\n` + text,
			footer: ucapanWaktu,
			mentions: [m.sender],
			contextInfo: {
				forwardingScore: 10,
				isForwarded: true,
			},
			buttons: [{
				buttonId: `${prefix}allmenu`,
				buttonText: { displayText: 'All Menu' },
				type: 1
			},{
				buttonId: `${prefix}sc`,
				buttonText: { displayText: 'SC' },
				type: 1
			}]
		}, { quoted: m })
	} else if (type == 2 || type == 'listMessage') {
		await naze.sendButtonMsg(m.chat, {
			text: `Hello nigga @${m.sender.split('@')[0]}\n` + text,
			footer: ucapanWaktu,
			mentions: [m.sender],
			contextInfo: {
				forwardingScore: 10,
				isForwarded: true,
			},
			buttons: [{
				buttonId: `${prefix}allmenu`,
				buttonText: { displayText: 'All Menu' },
				type: 1
			},{
				buttonId: `${prefix}sc`,
				buttonText: { displayText: 'SC' },
				type: 1
			}, {
				buttonId: 'list_button',
				buttonText: { displayText: 'list' },
				nativeFlowInfo: {
					name: 'single_select',
					paramsJson: JSON.stringify({
						title: 'List Menu',
						sections: [{
							title: 'List Menu',
							rows: [{
								title: 'All Menu💯',
								id: `${prefix}allmenu`
							},{
								title: 'Those Who Know💀 Menu',
								id: `${prefix}botmenu`
							},{
								title: 'Only Group Menu🙏',
								id: `${prefix}groupmenu`
							},{
								title: 'Search Menu🔍 ',
								id: `${prefix}searchmenu`
							},{
								title: 'Download Menu📸☠️',
								id: `${prefix}downloadmenu`
							},{
								title: 'Quotes Menu',
								id: `${prefix}quotesmenu`
							},{
								title: 'Tools Menu',
								id: `${prefix}toolsmenu`
							},{
								title: 'Ai Menu',
								id: `${prefix}aimenu`
							},{
								title: 'Stalker Menu',
								id: `${prefix}stalkermenu`
							},{
								title: 'Random Menu',
								id: `${prefix}randommenu`
							},{
								title: 'Anime Menu',
								id: `${prefix}animemenu`
							},{
								title: 'Game Menu',
								id: `${prefix}gamemenu`
							},{
								title: 'Fun Menu',
								id: `${prefix}funmenu`
							},{
								title: 'Owner Menu',
								id: `${prefix}ownermenu`
							}]
						}]
					})
				},
				type: 2
			}]
		}, { quoted: m })
	} else if (type == 3 || type == 'documentMessage') {
		let profile
		try {
			profile = await naze.profilePictureUrl(m.sender, 'image');
		} catch (e) {
			profile = fake.anonim
		}
		const menunya = `
╭──❍「 *NIGGA'S INFO📸📸☠️💯* 」❍
├ *Nigga's name* : ${m.pushName ? m.pushName : 'Tanpa Nama'}
├ *Id* : @${m.sender.split('@')[0]}
├ *User* : ${options.isVip ? 'VIP' : options.isPremium ? 'THOSE WHO KNOW💀' : 'SKIBIDI USER'}
├ *Limit* : ${options.isVip ? 'VIP' : db.users[m.sender].limit }
├ *Bobux* : ${db.users[m.sender] ? db.users[m.sender].uang.toLocaleString('id-ID') : '0'}
╰─┬────❍
╭─┴─❍「 *LIL BOT'S INFO* 」❍
├ *Name Bot* : ${botname}
├ *Powered* : @${'0@s.whatsapp.net'.split('@')[0]}
├ *Respect to Bro* : @${owner[0].split('@')[0]}
├ *Mode* : ${naze.public ? 'Leaked' : 'Self'}
├ *Prefix* :${db.set[options.botNumber].multiprefix ? '「 MULTI-PREFIX 」' : ' *'+prefix+'*' }
╰─┬────❍
╭─┴─❍「 *WAKE UP TO REALITY* 」❍
├ *Date* : ${tanggal}
├ *Day* : ${hari}
├ *Hour* : ${jam} WIB
╰──────❍\n`
		await m.reply({
			document: fake.docs,
			fileName: ucapanWaktu,
			mimetype: pickRandom(fake.listfakedocs),
			fileLength: '100000000000000',
			pageCount: '999',
			caption: menunya + text,
			contextInfo: {
				mentionedJid: [m.sender, '0@s.whatsapp.net', owner[0] + '@s.whatsapp.net'],
				forwardingScore: 10,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterJid: my.ch,
					serverMessageId: null,
					newsletterName: 'Join For More Info'
				},
				externalAdReply: {
					title: author,
					body: packname,
					showAdAttribution: true,
					thumbnailUrl: profile,
					mediaType: 1,
					previewType: 0,
					renderLargerThumbnail: true,
					mediaUrl: my.gh,
					sourceUrl: my.gh,
				}
			}
		})
	} else if (type == 4 || type == 'videoMessage') {
		//tambahin sendiri :v
	} else {
		m.reply(`${ucapanWaktu} @${m.sender.split('@')[0]}\nSilahkan Gunakan ${prefix}allmenu\nUntuk Melihat Semua Menunya nigga🙏🙏`)
	}
}

module.exports = setTemplateMenu

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
