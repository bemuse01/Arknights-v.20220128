const path = './assets/src/'
const characterPath = path + 'character/'
const uiPath = path + 'ui/'

const bgs = [
    {
        path: path + 'lobby_bg.png',
    },
    {
        path: path + 'open_bg.png',
    },
    {
        path: path + 'terra.png',
    },
]

const uis = ['ui-change-character.png', 'ui_base_icon.png', 'ui_base_icon_2.png', 'ui_base_text.png', 'ui_base_text_2.png', 'ui_breaknews_text.png', 'ui_breaknews_text_2.png', 'ui_calendar_icon.png', 'ui_combat_icon.png', 'ui_combat_icon_2.png', 'ui_common.png', 'ui_common2.png', 'ui_common2_gray.png', 'ui_common_blue.png', 'ui_common_gray.png', 'ui_depot_icon.png', 'ui_depot_icon_2.png', 'ui_event_icon.png', 'ui_files_icon.png', 'ui_friends_icon.png', 'ui_headhunt_icon.png', 'ui_language_icon.png', 'ui_lmd_icon.png', 'ui_lmd_icon_2.png', 'ui_mail_icon.png', 'ui_mission_icon.png', 'ui_mission_icon_2.png', 'ui_operator_icon.png', 'ui_operator_icon_2.png', 'ui_originite_icon.png', 'ui_originite_icon_2.png', 'ui_orundum_icon.png', 'ui_orundum_icon_2.png', 'ui_play_icon.png', 'ui_profile.png', 'ui_recruitment_icon.png', 'ui_recruitment_title_icon.png', 'ui_sanity.png', 'ui_sanity_2.png', 'ui_setting_icon.png', 'ui_squads_icon.png', 'ui_squads_icon_2.png', 'ui_stop_icon.png', 'ui_store_icon.png', 'ui_store_icon_2.png', 'ui_voice_img.png', 'ui_volume_icon.png']
.map(ui => ({path: uiPath + ui}))

const characters = CHARACTER.map(({name, count}) => Array.from({length: count}, (_, i) => ({path: `${characterPath}${name}/${name} (${i + 1}).png`}))).flat()

const resources = [...bgs, ...uis, ...characters]