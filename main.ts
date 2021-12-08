namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const Task = SpriteKind.create()
    export const decoration = SpriteKind.create()
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
function startGame () {
    gameIntro = 0
    scene.setBackgroundColor(11)
    effects.starField.startScreenEffect()
    Hops_and_Paw = sprites.create(assets.image`Hero - direct`, SpriteKind.Player)
    Hops_and_Paw.z = 2
    controller.moveSprite(Hops_and_Paw, 200, 200)
    Hops_and_Paw.setFlag(SpriteFlag.StayInScreen, true)
    ammoLeft = 0
    speed = 1
    projectileUpdate = 1000
    projectileSpeed = 50
    donutsUpdate = randint(3000, 15000)
    taskUpdate = randint(3000, 15000)
    gameOn = 1
    speed = 0
    Hops_and_Paw.y = 120
    info.setLife(5)
    projectileSpeedStep = 25
    projectileUpdateStep = -150
    gameTime = 0
    music.setVolume(20)
    objectGeneratingIndex = [[0, 0], [0, 0], [0, 0]]
    gameStart = 1
}
function intro () {
	
}
function startIntro () {
    scene.setBackgroundColor(9)
    Hops_and_Paw = sprites.create(assets.image`Intro Hero`, SpriteKind.Player)
    Hops_and_Paw.z = 2
    controller.moveSprite(Hops_and_Paw, 100, 0)
    Hops_and_Paw.setPosition(12, 152)
    Hops_and_Paw.ay = 200
    scene.cameraFollowSprite(Hops_and_Paw)
    assettable = sprites.create(assets.image`Bosses Table`, SpriteKind.decoration)
    assettable.setPosition(240, 164)
    assettable.z = 1
    boss = sprites.create(assets.image`Intro Boss`, SpriteKind.Player)
    boss.setPosition(240, 152)
    boss.ay = 200
    boss.z = 0
    tiles.setTilemap(tilemap`level5`)
    gameIntro = 1
    bossesDialog = 1
    story.spriteSayText(Hops_and_Paw, ":)")
}
function testDialogs () {
	
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (info.life() > 1) {
        otherSprite.destroy()
        music.pewPew.play()
        info.changeLifeBy(-1)
    } else {
        gameOn = 0
        game.splash("Здувся!")
        music.playMelody("C D E F G A B C5 ", 120)
        Hops_and_Paw.destroy()
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            value.destroy()
        }
        for (let value2 of sprites.allOfKind(SpriteKind.Food)) {
            value2.destroy()
        }
        for (let value3 of sprites.allOfKind(SpriteKind.Task)) {
            value3.destroy()
        }
        startGame()
    }
})
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.jumpUp.play()
    info.changeLifeBy(1)
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
        if (list[0] - 12 <= 6 && list[0] + 12 >= 154) {
            n = 2
        } else if (list[0] - 12 <= 6 && list[0] + 12 < 154) {
            n = randint(2, 3)
        } else if (list[0] - 12 > 6 && list[0] + 12 >= 154) {
            n = randint(1, 2)
        } else if (list[0] - 12 > 6 && list[0] + 12 < 154) {
            n = randint(1, 3)
        }
        if (n == 1) {
            position = randint(6, list[0] - 12)
        } else if (n == 2) {
            position = randint(list[0] + 12, list[1] - 12)
        } else {
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
let value4: Sprite = null
let n = 0
let i = 0
let bigOne = 0
let smallOne = 0
let position = 0
let timeToMove = 0
let bossesDialog = 0
let boss: Sprite = null
let assettable: Sprite = null
let gameStart = 0
let objectGeneratingIndex: number[][] = []
let gameTime = 0
let projectileUpdateStep = 0
let projectileSpeedStep = 0
let gameOn = 0
let taskUpdate = 0
let donutsUpdate = 0
let projectileSpeed = 0
let projectileUpdate = 0
let speed = 0
let ammoLeft = 0
let Hops_and_Paw: Sprite = null
let gameIntro = 0
let list: number[] = []
start()
startIntro()
game.onUpdate(function () {
    if (gameStart) {
        if (Hops_and_Paw.vx < 0) {
            Hops_and_Paw.setImage(assets.image`Hero - left`)
        } else if (Hops_and_Paw.vx > 0) {
            Hops_and_Paw.setImage(assets.image`Hero - right`)
        } else {
            Hops_and_Paw.setImage(assets.image`Hero - direct`)
        }
        if (info.life() == 0) {
            gameOn = 0
        }
        if (info.score() == 5 && speed == 0) {
            projectileSpeed += projectileSpeedStep
            projectileUpdate += projectileUpdateStep
            speed += 1
            gameOn = 0
            game.splash("Дедлайн наближається.")
            game.splash("Збільшити швидкість!")
            gameOn = 1
        } else if (info.score() == 10 && speed == 1) {
            projectileSpeed += projectileSpeedStep
            projectileUpdate += projectileUpdateStep
            speed += 1
            gameOn = 0
            game.splash("Дедлайн наближається.")
            game.splash("Збільшити швидкість!")
            gameOn = 1
        } else if (info.score() == 15 && speed == 2) {
            projectileSpeed += projectileSpeedStep
            projectileUpdate += projectileUpdateStep
            speed += 1
            gameOn = 0
            game.splash("Дедлайн наближається.")
            game.splash("Збільшити швидкість!")
            gameOn = 1
        } else if (info.score() == 20 && speed == 3) {
            projectileSpeed += projectileSpeedStep
            projectileUpdate += projectileUpdateStep
            speed += 1
            gameOn = 0
            game.splash("Дедлайн наближається.")
            game.splash("Збільшити швидкість!")
            gameOn = 1
        } else if (info.score() == 25 && speed == 4) {
            projectileSpeed += projectileSpeedStep
            projectileUpdate += projectileUpdateStep
            speed += 1
            gameOn = 0
            game.splash("Дедлайн наближається.")
            game.splash("Збільшити швидкість!")
            gameOn = 1
        } else {
        	
        }
    }
})
game.onUpdate(function () {
    if (gameIntro) {
        if (boss.x - Hops_and_Paw.x <= 30 && bossesDialog) {
            game.splash("ііі")
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
                value4 = sprites.create(assets.image`Donut 1`, SpriteKind.Food)
            } else if (n == 2) {
                value4 = sprites.create(assets.image`Donut 3`, SpriteKind.Food)
            } else if (n == 3) {
                value4 = sprites.create(assets.image`Donut 2`, SpriteKind.Food)
            } else if (n == 4) {
                value4 = sprites.create(assets.image`Donut 4`, SpriteKind.Food)
            } else if (n == 5) {
                value4 = sprites.create(assets.image`Donut 5`, SpriteKind.Food)
            } else {
                value4 = sprites.create(assets.image`Donut 6`, SpriteKind.Food)
            }
            console.log("-------------------------")
            console.log(".........................")
            console.log("*** Donut ***")
            picPosition()
            console.log("-- outside picPosition --")
            console.log("position")
            console.log(position)
            value4.setPosition(position, 0)
            value4.setVelocity(0, projectileSpeed)
            value4.z = 2
            value4.setFlag(SpriteFlag.AutoDestroy, true)
            objectGeneratingIndex[1][0] = position
            console.log("sprite x")
            console.log(value4.x)
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
        n = randint(1, 6)
        if (n == 1) {
            value4 = sprites.create(assets.image`Instagram`, SpriteKind.Projectile)
        } else if (n == 2) {
            value4 = sprites.create(assets.image`YouTube`, SpriteKind.Projectile)
        } else if (n == 3) {
            value4 = sprites.create(assets.image`Twitter`, SpriteKind.Projectile)
        } else if (n == 4) {
            value4 = sprites.create(assets.image`TikTok`, SpriteKind.Projectile)
        } else if (n == 5) {
            value4 = sprites.create(assets.image`PornHub`, SpriteKind.Projectile)
        } else {
            value4 = sprites.create(assets.image`Facebook`, SpriteKind.Projectile)
        }
        console.log("-------------------------")
        console.log(".........................")
        console.log("*** Projectile ***")
        picPosition()
        console.log("-- outside picPosition --")
        console.log("position")
        console.log(position)
        value4.setPosition(position, 0)
        value4.setVelocity(0, projectileSpeed)
        value4.z = 2
        value4.setFlag(SpriteFlag.AutoDestroy, true)
        objectGeneratingIndex[0][0] = position
        console.log("sprite x")
        console.log(value4.x)
        console.log("position")
        console.log(position)
        objectGeneratingIndex[0][1] = game.runtime()
        pause(projectileUpdate)
    }
})
forever(function () {
    while (gameOn) {
        if (gameTime < 5000) {
            pause(taskUpdate)
        } else {
            value4 = sprites.create(assets.image`Task`, SpriteKind.Task)
            console.log("-------------------------")
            console.log(".........................")
            console.log("*** Donut ***")
            picPosition()
            console.log("-- outside picPosition --")
            console.log("position")
            console.log(position)
            value4.setPosition(position, 0)
            value4.setVelocity(0, projectileSpeed)
            value4.setFlag(SpriteFlag.AutoDestroy, true)
            objectGeneratingIndex[2][0] = position
            console.log("sprite x")
            console.log(value4.x)
            console.log("position")
            console.log(position)
            objectGeneratingIndex[2][1] = game.runtime()
            taskUpdate = randint(3000, 10000)
            pause(taskUpdate)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (gameStart) {
        gameTime += 500
    }
})
