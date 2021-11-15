namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const Task = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammoLeft > 0) {
        let facingLeft = 0
        if (facingLeft == 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . d d d d d d d d . . . . 
                . . . d d 3 3 3 3 3 3 d d . . . 
                . . . d 3 3 d d 3 3 3 3 d d . . 
                . . . d 3 d . d d 3 3 3 3 d . . 
                . . d d 3 d . . . d d 3 3 d . . 
                . . d 3 3 d . . . . d d 3 d . . 
                . . d 3 3 d d . . . . d 3 d . . 
                . . d d 3 3 d . . . . d 3 d . . 
                . . . d 3 3 d d . . d d 3 d . . 
                . . . d 3 3 3 d d d d 3 3 d . . 
                . . . d d 3 3 3 3 3 3 3 3 d . . 
                . . . . d d 3 3 3 3 d d d d . . 
                . . . . . . d d d d d . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Hops_and_Paw, 200, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . d d d d d d d d . . . . 
                . . . d d 3 3 3 3 3 3 d d . . . 
                . . . d 3 3 d d 3 3 3 3 d d . . 
                . . . d 3 d . d d 3 3 3 3 d . . 
                . . d d 3 d . . . d d 3 3 d . . 
                . . d 3 3 d . . . . d d 3 d . . 
                . . d 3 3 d d . . . . d 3 d . . 
                . . d d 3 3 d . . . . d 3 d . . 
                . . . d 3 3 d d . . d d 3 d . . 
                . . . d 3 3 3 d d d d 3 3 d . . 
                . . . d d 3 3 3 3 3 3 3 3 d . . 
                . . . . d d 3 3 3 3 d d d d . . 
                . . . . . . d d d d d . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Hops_and_Paw, -200, 0)
        }
        ammoLeft += -1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hops_and_Paw.vy == 0) {
        Hops_and_Paw.vy = 0
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Task, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(1)
})
let value: Sprite = null
let n = 0
let projectile: Sprite = null
let ammoLeft = 0
let Hops_and_Paw: Sprite = null
scene.setBackgroundColor(11)
effects.starField.startScreenEffect()
Hops_and_Paw = sprites.create(assets.image`Hero - direct`, SpriteKind.Player)
controller.moveSprite(Hops_and_Paw, 200, 200)
Hops_and_Paw.setFlag(SpriteFlag.StayInScreen, true)
ammoLeft = 0
let speed = 1
let projectileUpdate = 1000
let projectileSpeed = 50
let donutsUpdate = randint(3000, 15000)
let taskUpdate = randint(3000, 15000)
let gameOn = 1
speed = 0
Hops_and_Paw.y = 120
info.setLife(5)
let projectileSpeedStep = 25
let projectileUpdateStep = -150
game.onUpdate(function () {
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
    if (info.score() == 3 && speed == 0) {
        projectileSpeed += projectileSpeedStep
        projectileUpdate += projectileUpdateStep
        speed += 1
        gameOn = 0
        game.splash("Дедлайн наближається.")
        game.splash("Збільшити швидкість!")
        game.splash(projectileSpeed)
        game.splash(projectileUpdate)
        gameOn = 1
    } else if (info.score() == 10 && speed == 1) {
        projectileSpeed += projectileSpeedStep
        projectileUpdate += projectileUpdateStep
        speed += 1
        gameOn = 0
        game.splash("Дедлайн наближається.")
        game.splash("Збільшити швидкість!")
        game.splash(projectileSpeed)
        game.splash(projectileUpdate)
        gameOn = 1
    } else if (info.score() == 15 && speed == 2) {
        projectileSpeed += projectileSpeedStep
        projectileUpdate += projectileUpdateStep
        speed += 1
        gameOn = 0
        game.splash("Дедлайн наближається.")
        game.splash("Збільшити швидкість!")
        game.splash(projectileSpeed)
        game.splash(projectileUpdate)
        gameOn = 1
    } else if (info.score() == 20 && speed == 3) {
        projectileSpeed += projectileSpeedStep
        projectileUpdate += projectileUpdateStep
        speed += 1
        gameOn = 0
        game.splash("Дедлайн наближається.")
        game.splash("Збільшити швидкість!")
        game.splash(projectileSpeed)
        game.splash(projectileUpdate)
        gameOn = 1
    } else if (info.score() == 25 && speed == 4) {
        projectileSpeed += projectileSpeedStep
        projectileUpdate += projectileUpdateStep
        speed += 1
        gameOn = 0
        game.splash("Дедлайн наближається.")
        game.splash("Збільшити швидкість!")
        game.splash(projectileSpeed)
        game.splash(projectileUpdate)
        gameOn = 1
    } else {
    	
    }
})
forever(function () {
    while (gameOn) {
        n = randint(1, 6)
        if (n == 1) {
            value = sprites.create(assets.image`Instagram`, SpriteKind.Projectile)
        } else if (n == 2) {
            value = sprites.create(assets.image`YouTube`, SpriteKind.Projectile)
        } else if (n == 3) {
            value = sprites.create(assets.image`Twitter`, SpriteKind.Projectile)
        } else if (n == 4) {
            value = sprites.create(assets.image`TikTok`, SpriteKind.Projectile)
        } else if (n == 5) {
            value = sprites.create(assets.image`PornHub`, SpriteKind.Projectile)
        } else {
            value = sprites.create(assets.image`Facebook`, SpriteKind.Projectile)
        }
        value.setPosition(randint(5, 155), 0)
        value.setVelocity(0, projectileSpeed)
        value.setFlag(SpriteFlag.AutoDestroy, true)
        pause(projectileUpdate)
    }
})
forever(function () {
    if (game.runtime() < 5000) {
        pause(donutsUpdate)
    }
    while (gameOn) {
        n = randint(1, 2)
        if (n == 1) {
            value = sprites.create(assets.image`Donut 1`, SpriteKind.Food)
        } else {
            value = sprites.create(assets.image`Donut 0`, SpriteKind.Food)
        }
        value.setPosition(randint(5, 155), 0)
        value.setVelocity(0, projectileSpeed)
        value.setFlag(SpriteFlag.AutoDestroy, true)
        donutsUpdate = randint(3000, 10000)
        pause(donutsUpdate)
    }
})
forever(function () {
    if (game.runtime() < 5000) {
        pause(taskUpdate)
    }
    while (gameOn) {
        value = sprites.create(assets.image`Task`, SpriteKind.Task)
        value.setPosition(randint(5, 155), 0)
        value.setVelocity(0, projectileSpeed)
        value.setFlag(SpriteFlag.AutoDestroy, true)
        taskUpdate = randint(3000, 10000)
        pause(taskUpdate)
    }
})
