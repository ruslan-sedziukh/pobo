namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const Task = SpriteKind.create()
    export const decoration = SpriteKind.create()
    export const portal = SpriteKind.create()
    export const GameButton = SpriteKind.create()
    export const IntroButton = SpriteKind.create()
    export const Button = SpriteKind.create()
}
function testListSort () {
    list = [
    1100,
    7,
    5,
    2,
    4,
    0,
    250000,
    35
    ]
    console.log("unsorted list")
    console.log(list)
    sortList()
    console.log("sorted list")
    console.log(list)
}
function takeABonus1 () {
    stopMove()
    gameOn = 0
    assetphone_call = sprites.create(assets.image`Phonecall`, SpriteKind.decoration)
    assetphone_call.z = 3
    assetphone_call.setPosition(80, 60)
    story.spriteSayText(assetphone_call, "Дзень-дзень")
    story.spriteSayText(assetphone_call, "Керівництво задоволене твоїми результатами.")
    story.spriteSayText(assetphone_call, "Продовжуй у тому ж дусі і твої старання будуть винагородженні!")
    assetphone_call.destroy()
    gameOn = 1
    letsMove()
}
function startMenu () {
    scene.setBackgroundColor(11)
    assetcoursor = sprites.create(assets.image`coursore2`, SpriteKind.Player)
    assetcoursor.setStayInScreen(true)
    assetcoursor.z = 1
    controller.moveSprite(assetcoursor, 150, 150)
    assetgameButton = sprites.create(assets.image`Game Button 2`, SpriteKind.Button)
    assetgameButton.setPosition(80, 45)
    assetintroButton = sprites.create(assets.image`Intro Button 2`, SpriteKind.Button)
    assetintroButton.setPosition(80, 75)
}
function stopMove () {
    controller.moveSprite(Hops_and_Paw, 0, 0)
    for (let value of sprites.allOfKind(SpriteKind.Task)) {
        value.setVelocity(0, 0)
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Projectile)) {
        value2.setVelocity(0, 0)
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Food)) {
        value3.setVelocity(0, 0)
    }
}
function startGame () {
    gameIntro = 0
    scene.setBackgroundColor(11)
    effects.starField.startScreenEffect()
    Hops_and_Paw = sprites.create(assets.image`Hero - direct`, SpriteKind.Player)
    Hops_and_Paw.setPosition(80, 120)
    Hops_and_Paw.z = 2
    controller.moveSprite(Hops_and_Paw, 200, 200)
    Hops_and_Paw.setFlag(SpriteFlag.StayInScreen, true)
    scene.centerCameraAt(80, 60)
    projectileUpdate = 1000
    projectileSpeed = 50
    donutsUpdate = randint(3000, 15000)
    taskUpdate = randint(3000, 15000)
    gameOn = 1
    speed = 0
    info.setLife(5)
    projectileSpeedStep = 20
    gameTime = 0
    music.setVolume(20)
    objectGeneratingIndex = [[0, 0], [0, 0], [0, 0]]
    take_a_bonus_2_scene_2 = 0
    take_a_bonus_3_scene_2 = 0
    gameStart = 1
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.portal, function (sprite, otherSprite) {
    Hops_and_Paw.destroy()
    assetportal.destroy()
    assettable.destroy()
    boss.destroy()
    startGame()
})
function takeABonus2 () {
    stopMove()
    gameOn = 0
    assetphone_call = sprites.create(assets.image`Phonecall`, SpriteKind.decoration)
    assetphone_call.z = 3
    assetphone_call.setPosition(80, 60)
    story.spriteSayText(assetphone_call, "Дзень-дзень")
    story.spriteSayText(assetphone_call, "Ти робиш успіхи.")
    story.spriteSayText(assetphone_call, "Компанія не залишає таке без уваги і гідно винагорожує.")
    story.spriteSayText(assetphone_call, "Прийми це. Ти заслужив!")
    assetphone_call.destroy()
    effects.confetti.startScreenEffect()
    assetbonus = sprites.create(assets.image`The Cup L1`, SpriteKind.decoration)
    assetbonus.z = 3
    assetbonus.setPosition(80, 60)
    assetokButton = sprites.create(assets.image`Ok button`, SpriteKind.Button)
    assetokButton.z = 4
    assetokButton.setPosition(80, 91)
    assetcoursor = sprites.create(assets.image`coursore2`, SpriteKind.Player)
    assetcoursor.z = 5
    controller.moveSprite(assetcoursor, 150, 150)
}
function startIntro () {
    scene.setBackgroundColor(11)
    Hops_and_Paw = sprites.create(assets.image`Intro Hero`, SpriteKind.Player)
    Hops_and_Paw.z = 2
    controller.moveSprite(Hops_and_Paw, 100, 0)
    Hops_and_Paw.setPosition(12, 152)
    Hops_and_Paw.ay = 200
    scene.cameraFollowSprite(Hops_and_Paw)
    boss = sprites.create(assets.image`Intro Boss`, SpriteKind.Player)
    boss.setPosition(240, 152)
    boss.ay = 200
    boss.z = 0
    assettable = sprites.create(assets.image`Bosses Table`, SpriteKind.decoration)
    assettable.setPosition(240, 164)
    assettable.z = 2
    assetportal = sprites.create(assets.image`Level portal`, SpriteKind.portal)
    assetportal.setPosition(400, 152)
    assetportal.ay = 200
    assettable.z = 0
    tiles.setTilemap(tilemap`level5`)
    gameIntro = 1
    bossesDialog = 1
    beeDialog = 1
}
function speed_up () {
    projectileSpeed += projectileSpeedStep
    projectileUpdate = 50000 / projectileSpeed
    updateSpeed()
    speed += 1
    gameOn = 0
    game.splash("Дедлайн наближається.")
    game.splash("Збільшити швидкість!")
    gameOn = 1
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (info.life() > 1) {
        otherSprite.destroy()
        music.pewPew.play()
        info.changeLifeBy(-1)
    } else {
        gameOn = 0
        Hops_and_Paw.destroy(effects.fire, 500)
        effects.starField.endScreenEffect()
        game.over(false, effects.dissolve)
    }
})
function updateSpeed () {
    for (let value4 of sprites.allOfKind(SpriteKind.Task)) {
        value4.setVelocity(0, projectileSpeed)
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Projectile)) {
        value5.setVelocity(0, projectileSpeed)
    }
    for (let value6 of sprites.allOfKind(SpriteKind.Food)) {
        value6.setVelocity(0, projectileSpeed)
    }
}
function takeABonus3 () {
    stopMove()
    gameOn = 0
    assetphone_call = sprites.create(assets.image`Phonecall`, SpriteKind.decoration)
    assetphone_call.z = 3
    assetphone_call.setPosition(80, 60)
    story.spriteSayText(assetphone_call, "Дзень-дзень")
    story.spriteSayText(assetphone_call, "Неймовірно!")
    story.spriteSayText(assetphone_call, "Ніколи не бачили нічого вражаючішого!")
    story.spriteSayText(assetphone_call, "Ти заслужив головний бонус!")
    assetphone_call.destroy()
    effects.hearts.startScreenEffect()
    assetbonus = sprites.create(assets.image`THE BONUS`, SpriteKind.decoration)
    assetbonus.z = 3
    assetbonus.setPosition(80, 60)
    assetokButton2 = sprites.create(assets.image`Ok button`, SpriteKind.Button)
    assetokButton2.z = 4
    assetokButton2.setPosition(80, 91)
    assetcoursor = sprites.create(assets.image`coursore2`, SpriteKind.Player)
    assetcoursor.z = 5
    controller.moveSprite(assetcoursor, 150, 150)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Task, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    otherSprite.destroy()
})
function picPosition () {
    console.log("-- inside picPosition --")
    timeToMove = 11 / projectileSpeed * 1000
    list = []
    getList()
    console.log("unsorted list")
    console.log(list)
    sortList()
    console.log("sorted list")
    console.log(list)
    getX()
    console.log("postition")
    console.log(position)
}
function letsMove () {
    controller.moveSprite(Hops_and_Paw, 200, 200)
    for (let value7 of sprites.allOfKind(SpriteKind.Task)) {
        value7.setVelocity(0, projectileSpeed)
    }
    for (let value8 of sprites.allOfKind(SpriteKind.Projectile)) {
        value8.setVelocity(0, projectileSpeed)
    }
    for (let value9 of sprites.allOfKind(SpriteKind.Food)) {
        value9.setVelocity(0, projectileSpeed)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.jumpUp.play()
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Button, function (sprite, otherSprite) {
    if (otherSprite == assetgameButton && controller.A.isPressed()) {
        assetcoursor.destroy()
        assetgameButton.destroy()
        assetintroButton.destroy()
        startGame()
    }
    if (otherSprite == assetintroButton && controller.A.isPressed()) {
        assetcoursor.destroy()
        assetgameButton.destroy()
        assetintroButton.destroy()
        startIntro()
    }
    if (otherSprite == assetokButton && controller.A.isPressed()) {
        assetcoursor.destroy()
        assetbonus.destroy()
        assetokButton.destroy()
        effects.confetti.endScreenEffect()
        take_a_bonus_2_scene_2 = 1
    }
    if (otherSprite == assetokButton2 && controller.A.isPressed()) {
        assetcoursor.destroy()
        assetbonus.destroy()
        assetokButton2.destroy()
        effects.hearts.endScreenEffect()
        take_a_bonus_3_scene_2 = 1
    }
})
function sortList () {
    if (list.length > 1) {
        for (let index2 = 0; index2 <= list.length - 1; index2++) {
            if (list.length - index2 >= 2) {
                if (list[index2] > list[index2 + 1]) {
                    smallOne = list[index2 + 1]
                    bigOne = list[index2]
                    list[index2] = smallOne
                    list[index2 + 1] = bigOne
                    i = index2
                    while (i > 0) {
                        if (list[i - 1] > list[i]) {
                            smallOne = list[i]
                            bigOne = list[i - 1]
                            list[i] = bigOne
                            list[i - 1] = smallOne
                            i += -1
                        } else {
                            break;
                        }
                    }
                }
            } else {
                break;
            }
        }
    }
}
function start () {
    gameOn = 0
    gameTime = 0
    gameStart = 0
}
function getX () {
    if (list.length == 1) {
        if (list[0] + 12 >= 154) {
            n = 1
        } else if (list[0] - 12 <= 6) {
            n = 2
        } else {
            n = randint(1, 2)
        }
        if (n == 1) {
            position = randint(6, list[0] - 12)
        } else {
            position = randint(list[0] + 12, 154)
        }
    } else if (list.length == 2) {
        if (list[0] - 12 <= 6 && list[1] + 12 >= 154) {
            n = 2
        } else if (list[0] - 12 <= 6 && list[1] + 12 < 154) {
            if (list[1] - list[0] >= 25) {
                n = randint(2, 3)
            } else {
                n = 3
            }
        } else if (list[0] - 12 > 6 && list[1] + 12 >= 154) {
            if (list[1] - list[0] >= 25) {
                n = randint(1, 2)
            } else {
                n = 1
            }
        } else if (list[0] - 12 > 6 && list[1] + 12 < 154) {
            if (list[1] - list[0] >= 25) {
                n = randint(1, 3)
            } else {
                n = randint(1, 2)
                if (n == 2) {
                    n = 3
                }
            }
        }
        if (n == 1) {
            position = randint(6, list[0] - 12)
        } else if (n == 2) {
            position = randint(list[0] + 12, list[1] - 12)
        } else if (n == 3) {
            position = randint(list[1] + 12, 154)
        }
    } else {
        position = randint(6, 154)
    }
}
function getList () {
    i = 0
    for (let index = 0; index <= objectGeneratingIndex.length - 1; index++) {
        if (game.runtime() - objectGeneratingIndex[index][1] < timeToMove) {
            list[i] = objectGeneratingIndex[index][0]
            i += 1
        }
    }
}
let assetbee: Sprite = null
let value42: Sprite = null
let n = 0
let i = 0
let bigOne = 0
let smallOne = 0
let position = 0
let timeToMove = 0
let assetokButton2: Sprite = null
let beeDialog = 0
let bossesDialog = 0
let assetokButton: Sprite = null
let assetbonus: Sprite = null
let boss: Sprite = null
let assettable: Sprite = null
let assetportal: Sprite = null
let gameStart = 0
let take_a_bonus_3_scene_2 = 0
let take_a_bonus_2_scene_2 = 0
let objectGeneratingIndex: number[][] = []
let gameTime = 0
let projectileSpeedStep = 0
let speed = 0
let taskUpdate = 0
let donutsUpdate = 0
let projectileSpeed = 0
let projectileUpdate = 0
let gameIntro = 0
let Hops_and_Paw: Sprite = null
let assetintroButton: Sprite = null
let assetgameButton: Sprite = null
let assetcoursor: Sprite = null
let assetphone_call: Sprite = null
let gameOn = 0
let list: number[] = []
start()
startMenu()
game.onUpdate(function () {
    if (gameStart) {
        if (Hops_and_Paw.vx < 0) {
            Hops_and_Paw.setImage(assets.image`Hero - left`)
        } else if (Hops_and_Paw.vx > 0) {
            Hops_and_Paw.setImage(assets.image`Hero - right`)
        } else {
            Hops_and_Paw.setImage(assets.image`Hero - direct`)
        }
    }
})
forever(function () {
    if (gameIntro) {
        if (boss.x - Hops_and_Paw.x <= 35 && bossesDialog) {
            controller.moveSprite(Hops_and_Paw, 0, 0)
            story.spriteSayText(Hops_and_Paw, "Йо, бос.")
            story.spriteSayText(boss, "Йо, заходь.")
            story.spriteSayText(boss, "Керівництво постановило стратегічну ціль компанії.")
            story.spriteSayText(boss, "Твоє завдання - досягнути цієї цілі!")
            story.spriteSayText(Hops_and_Paw, "Якої цілі?")
            story.spriteSayText(boss, "Щоб ми стали найкращою компанією у світі! ")
            story.spriteSayText(Hops_and_Paw, "Так, бос!")
            story.spriteSayText(boss, "Компанія на тебе покладається.")
            boss.setImage(assets.image`Intro Boss 2`)
            story.spriteSayText(boss, "Вперед. І не відволікайся на всяку фігню!")
            controller.moveSprite(Hops_and_Paw, 100, 0)
            bossesDialog = 0
        }
    }
})
forever(function () {
    while (gameOn) {
        if (gameTime < 5000) {
            pause(donutsUpdate)
        } else {
            n = randint(1, 6)
            if (n == 1) {
                value42 = sprites.create(assets.image`Donut 1`, SpriteKind.Food)
            } else if (n == 2) {
                value42 = sprites.create(assets.image`Donut 3`, SpriteKind.Food)
            } else if (n == 3) {
                value42 = sprites.create(assets.image`Donut 2`, SpriteKind.Food)
            } else if (n == 4) {
                value42 = sprites.create(assets.image`Donut 4`, SpriteKind.Food)
            } else if (n == 5) {
                value42 = sprites.create(assets.image`Donut 5`, SpriteKind.Food)
            } else {
                value42 = sprites.create(assets.image`Donut 6`, SpriteKind.Food)
            }
            console.log("-------------------------")
            console.log(".........................")
            console.log("*** Donut ***")
            picPosition()
            console.log("-- outside picPosition --")
            console.log("position")
            console.log(position)
            value42.setPosition(position, 0)
            value42.setVelocity(0, projectileSpeed)
            value42.z = 2
            value42.setFlag(SpriteFlag.AutoDestroy, true)
            objectGeneratingIndex[1][0] = position
            console.log("sprite x")
            console.log(value42.x)
            console.log("position")
            console.log(position)
            objectGeneratingIndex[1][1] = game.runtime()
            donutsUpdate = randint(3000, 10000)
            pause(donutsUpdate)
        }
    }
})
forever(function () {
    while (gameOn) {
        n = randint(1, 7)
        if (n == 1) {
            value42 = sprites.create(assets.image`Instagram`, SpriteKind.Projectile)
        } else if (n == 2) {
            value42 = sprites.create(assets.image`YouTube`, SpriteKind.Projectile)
        } else if (n == 3) {
            value42 = sprites.create(assets.image`Twitter`, SpriteKind.Projectile)
        } else if (n == 4) {
            value42 = sprites.create(assets.image`TikTok`, SpriteKind.Projectile)
        } else if (n == 5) {
            value42 = sprites.create(assets.image`PornHub`, SpriteKind.Projectile)
        } else if (n == 6) {
            value42 = sprites.create(assets.image`Facebook`, SpriteKind.Projectile)
        } else {
            value42 = sprites.create(assets.image`myImage1`, SpriteKind.Projectile)
        }
        console.log("-------------------------")
        console.log(".........................")
        console.log("*** Projectile ***")
        picPosition()
        console.log("-- outside picPosition --")
        console.log("position")
        console.log(position)
        value42.setPosition(position, 0)
        value42.setVelocity(0, projectileSpeed)
        value42.z = 2
        value42.setFlag(SpriteFlag.AutoDestroy, true)
        objectGeneratingIndex[0][0] = position
        console.log("sprite x")
        console.log(value42.x)
        console.log("position")
        console.log(position)
        objectGeneratingIndex[0][1] = game.runtime()
        pause(projectileUpdate)
    }
})
forever(function () {
    if (gameIntro) {
        if (Hops_and_Paw.x - boss.x >= 100 && beeDialog) {
            controller.moveSprite(Hops_and_Paw, 0, 0)
            story.spriteSayText(Hops_and_Paw, "Я в дупі...")
            assetbee = sprites.create(assets.image`Bee`, SpriteKind.decoration)
            assetbee.setPosition(Hops_and_Paw.x + 45, Hops_and_Paw.y - 10)
            assetbee.startEffect(effects.confetti)
            animation.runImageAnimation(
            assetbee,
            assets.animation`Bee Animation 2`,
            200,
            true
            )
            story.spriteSayText(assetbee, "Кукарілеко перфавор!")
            story.spriteSayText(assetbee, "Схоже, що тобі не завадить допомога. ")
            story.spriteSayText(Hops_and_Paw, "Мені дали дуже складний і важливий проект. ")
            story.spriteSayText(Hops_and_Paw, "І я боюсь, що не впораюсь. ")
            story.spriteSayText(assetbee, "Є дещо, що допоможе тобі впоратися із цим проектом.")
            story.spriteSayText(Hops_and_Paw, "Що ж це?")
            story.spriteSayText(assetbee, "Пончики!")
            story.spriteSayText(Hops_and_Paw, "Точно!")
            story.spriteSayText(assetbee, "Не падай духом.")
            story.spriteSayText(assetbee, "Їж пончики, закривай таски і усе в тебе вийде.")
            story.spriteSayText(assetbee, "Ларара тата тута!")
            assetbee.destroy(effects.confetti, 1000)
            controller.moveSprite(Hops_and_Paw, 100, 0)
            beeDialog = 0
        }
    }
})
forever(function () {
    if (gameStart) {
        if (info.life() == 0) {
            gameOn = 0
        }
        if (info.score() == 5 && speed == 0) {
            speed_up()
        } else if (info.score() == 10 && speed == 1) {
            speed_up()
        } else if (info.score() == 15 && speed == 2) {
            speed_up()
        } else if (info.score() == 20 && speed == 3) {
            speed_up()
        } else if (info.score() == 25 && speed == 4) {
            speed_up()
            takeABonus1()
        } else if (info.score() == 50 && speed == 5) {
            takeABonus2()
            speed += 1
        } else if (info.score() == 100 && speed == 6) {
            takeABonus3()
            speed += 1
        }
    }
})
forever(function () {
    while (gameOn) {
        if (gameTime < 5000) {
            pause(taskUpdate)
        } else {
            value42 = sprites.create(assets.image`Task`, SpriteKind.Task)
            console.log("-------------------------")
            console.log(".........................")
            console.log("*** Donut ***")
            picPosition()
            console.log("-- outside picPosition --")
            console.log("position")
            console.log(position)
            value42.setPosition(position, 0)
            value42.setVelocity(0, projectileSpeed)
            value42.setFlag(SpriteFlag.AutoDestroy, true)
            objectGeneratingIndex[2][0] = position
            console.log("sprite x")
            console.log(value42.x)
            console.log("position")
            console.log(position)
            objectGeneratingIndex[2][1] = game.runtime()
            taskUpdate = randint(3000, 10000)
            pause(taskUpdate)
        }
    }
})
forever(function () {
    if (take_a_bonus_2_scene_2) {
        assetphone_call = sprites.create(assets.image`Phonecall`, SpriteKind.decoration)
        assetphone_call.z = 3
        assetphone_call.setPosition(80, 60)
        story.spriteSayText(assetphone_call, "Продовжуй у тому ж дусі і на тебе чекає головний бонус!")
        assetphone_call.destroy()
        gameOn = 1
        take_a_bonus_2_scene_2 = 0
        letsMove()
    }
    if (take_a_bonus_3_scene_2) {
        assetphone_call = sprites.create(assets.image`Phonecall`, SpriteKind.decoration)
        assetphone_call.z = 3
        assetphone_call.setPosition(80, 60)
        story.spriteSayText(assetphone_call, "Але!")
        story.spriteSayText(assetphone_call, "Ми ще не найкраща компанія у світі.")
        story.spriteSayText(assetphone_call, "Тож у тебе ще купа роботи!")
        assetphone_call.destroy()
        gameOn = 1
        take_a_bonus_3_scene_2 = 0
        letsMove()
    }
})
game.onUpdateInterval(500, function () {
    if (gameStart) {
        gameTime += 500
    }
})
