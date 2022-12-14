namespace SpriteKind {
    export const RhythmStuff = SpriteKind.create()
    export const RhythmButton = SpriteKind.create()
    export const RhythmSuccess = SpriteKind.create()
    export const RhythmFail = SpriteKind.create()
    export const DecorationCrab = SpriteKind.create()
    export const DecorationFIsh = SpriteKind.create()
}
function part_3 () {
    animation_state = 2
    button_freq = 1500
}
function part_10_transition () {
    animation_state = 3
    button_freq = 1000
}
function part_6 () {
    animation_state = 0
    button_freq = 2000
    remove_crabs(2)
    remove_fish(1)
}
function part_4_transition () {
    animation_state = 3
    button_freq = 1250
    add_crabs(1)
    add_fish(1)
}
function make_text (text: string, x: number, y: number) {
    sprite_message = textsprite.create(text, 0, 1)
    sprite_message.x = x
    sprite_message.y = y
    return sprite_message
}
function add_fish (count: number) {
    timer.background(function () {
        for (let index = 0; index < count; index++) {
            if (fish_count == 0) {
                left_fish = sprites.create(assets.image`right_fish_idle`, SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                left_fish,
                assets.animation`right_fish_animation`,
                200,
                true
                )
            } else {
                left_fish = sprites.create(assets.image`right_fish_2_idle`, SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                left_fish,
                assets.animation`right_fish_2_animation`,
                200,
                true
                )
            }
            left_fish.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(left_fish, "facing_left", false)
            left_fish.right = 0
            if (fish_count == 0) {
                left_fish.y = tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_3`)[0], tiles.XY.y)
            } else {
                left_fish.y = tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_1`)[0], tiles.XY.y)
            }
            if (fish_count == 0) {
                right_fish = sprites.create(assets.image`right_fish_idle`, SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                right_fish,
                assets.animation`left_fish_animation0`,
                200,
                true
                )
            } else {
                right_fish = sprites.create(assets.image`right_fish_2_idle`, SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                right_fish,
                assets.animation`left_fish_animation`,
                200,
                true
                )
            }
            right_fish.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(right_fish, "facing_left", true)
            right_fish.left = scene.screenWidth()
            if (fish_count == 0) {
                right_fish.y = tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_1`)[0], tiles.XY.y)
                timer.background(function () {
                    story.spriteMoveToLocation(right_fish, tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_1`)[0], tiles.XY.x), right_fish.y, 30)
                })
                story.spriteMoveToLocation(left_fish, tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_3`)[0], tiles.XY.x), left_fish.y, 30)
            } else {
                right_fish.y = tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_2`)[0], tiles.XY.y)
                timer.background(function () {
                    story.spriteMoveToLocation(right_fish, tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_2`)[0], tiles.XY.x), right_fish.y, 30)
                })
                story.spriteMoveToLocation(left_fish, tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_1`)[0], tiles.XY.x), left_fish.y, 30)
            }
            fish_count += 1
        }
    })
}
function prepare_tilemap () {
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`map`))
    tiles.coverAllTiles(assets.tile`left_fish_3`, assets.tile`water`)
    tiles.coverAllTiles(assets.tile`left_fish_1`, assets.tile`water`)
    tiles.coverAllTiles(assets.tile`right_fish_1`, assets.tile`water`)
    tiles.coverAllTiles(assets.tile`right_fish_2`, assets.tile`water`)
}
function part_1 () {
    animation_state = 0
    button_freq = 2000
}
function get_button_pressed () {
    if (controller.up.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.up)
    } else if (controller.down.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.down)
    } else if (controller.left.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.left)
    } else if (controller.right.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.right)
    } else {
        return ""
    }
}
function set_score (s: number) {
    score = s
}
function cleanup () {
    scene.setBackgroundColor(0)
    tiles.loadMap(tiles.createMap(tilemap`blank`))
    tiles.destroySpritesOfKind(SpriteKind.Player)
    tiles.destroySpritesOfKind(SpriteKind.Text)
    tiles.destroySpritesOfKind(SpriteKind.RhythmStuff)
    tiles.destroySpritesOfKind(SpriteKind.RhythmButton)
    tiles.destroySpritesOfKind(SpriteKind.RhythmSuccess)
    tiles.destroySpritesOfKind(SpriteKind.RhythmFail)
    tiles.destroySpritesOfKind(SpriteKind.DecorationCrab)
    tiles.destroySpritesOfKind(SpriteKind.DecorationFIsh)
}
function part_14 () {
    animation_state = -1
    button_freq = -1
}
function fade_out (block: boolean) {
    color.startFade(color.Black, color.originalPalette, 1000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function update_score () {
    if (!(sprite_score)) {
        sprite_score = textsprite.create("", 0, 15)
        sprite_score.top = 4
        sprite_score.setFlag(SpriteFlag.Ghost, true)
    }
    sprite_score.setText("Score: " + show_score)
    sprite_score.x = scene.screenWidth() / 2
}
function part_5 () {
    animation_state = 4
    button_freq = 1000
}
function fade_in (block: boolean) {
    color.startFade(color.originalPalette, color.Black, 1000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function part_8 () {
    animation_state = 2
    button_freq = 1500
}
function part_12 () {
    animation_state = 2
    button_freq = 1500
    remove_crabs(1)
    remove_fish(1)
}
function get_part_music (part: number) {
    if (part == 1 || part == 6) {
        return assets.animation`beginning`
    } else if (part == 2 || part == 7) {
        return assets.animation`beginning to part 1`
    } else if (part == 3 || part == 8) {
        return assets.animation`part 1`
    } else if (part == 4 || part == 9) {
        return assets.animation`part 1 to chorus`
    } else if (part == 5) {
        return assets.animation`chorus`
    } else if (part == 10) {
        return assets.animation`part 1 to chorus 2`
    } else if (part == 11) {
        return assets.animation`chorus 2`
    } else if (part == 12) {
        return assets.animation`chorus 2 to end`
    } else if (part == 13) {
        return assets.animation`end`
    } else if (part == 14) {
        return assets.animation`very end`
    } else {
        return []
    }
}
function remove_fish (count: number) {
    timer.background(function () {
        for (let index = 0; index < count; index++) {
            if (fish_count == 1) {
                left_fish = get_sprite_at(tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_3`)[0], tiles.XY.column), tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_3`)[0], tiles.XY.row), SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                left_fish,
                assets.animation`left_fish_animation0`,
                200,
                true
                )
            } else {
                left_fish = get_sprite_at(tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_1`)[0], tiles.XY.column), tiles.locationXY(tiles.getTilesByType(assets.tile`left_fish_1`)[0], tiles.XY.row), SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                left_fish,
                assets.animation`left_fish_animation`,
                200,
                true
                )
            }
            left_fish.setFlag(SpriteFlag.AutoDestroy, true)
            sprites.setDataBoolean(left_fish, "facing_left", true)
            if (fish_count == 1) {
                right_fish = get_sprite_at(tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_1`)[0], tiles.XY.column), tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_1`)[0], tiles.XY.row), SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                right_fish,
                assets.animation`right_fish_animation`,
                200,
                true
                )
            } else {
                right_fish = get_sprite_at(tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_2`)[0], tiles.XY.column), tiles.locationXY(tiles.getTilesByType(assets.tile`right_fish_2`)[0], tiles.XY.row), SpriteKind.DecorationFIsh)
                animation.runImageAnimation(
                right_fish,
                assets.animation`right_fish_2_animation`,
                200,
                true
                )
            }
            right_fish.setFlag(SpriteFlag.AutoDestroy, true)
            sprites.setDataBoolean(right_fish, "facing_left", false)
            timer.background(function () {
                story.spriteMoveToLocation(right_fish, scene.screenWidth() + 8, right_fish.y, 30)
            })
            story.spriteMoveToLocation(left_fish, -8, left_fish.y, 30)
            fish_count += -1
        }
    })
}
function make_player () {
    sprite_player = sprites.create(assets.image`crab_idle_left`, SpriteKind.Player)
    sprite_player.setFlag(SpriteFlag.Ghost, true)
    sprites.setDataBoolean(sprite_player, "facing_left", true)
    tiles.placeOnTile(sprite_player, tiles.getTileLocation(4, 5))
    sprite_player.x += tiles.tileWidth() / 2
}
function add_crabs (count: number) {
    timer.background(function () {
        for (let index = 0; index < count; index++) {
            sprite_left_crab = sprites.create(assets.image`crab_idle_right`, SpriteKind.DecorationCrab)
            sprite_left_crab.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(sprite_left_crab, "facing_left", true)
            sprite_left_crab.right = 0
            sprite_left_crab.y = sprite_player.y
            animation.runImageAnimation(
            sprite_left_crab,
            assets.animation`crab_right_walking_animation`,
            200,
            true
            )
            sprite_right_crab = sprites.create(assets.image`crab_idle_left`, SpriteKind.DecorationCrab)
            sprite_right_crab.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(sprite_right_crab, "facing_left", false)
            sprite_right_crab.left = scene.screenWidth()
            sprite_right_crab.y = sprite_player.y
            animation.runImageAnimation(
            sprite_right_crab,
            assets.animation`crab_right_walking_animation0`,
            200,
            true
            )
            timer.background(function () {
                story.spriteMoveToLocation(sprite_right_crab, all_crabs[all_crabs.length - 1].x + 32, sprite_player.y, 30)
                animation.stopAnimation(animation.AnimationTypes.All, sprite_right_crab)
            })
            story.spriteMoveToLocation(sprite_left_crab, all_crabs[0].x - 32, sprite_player.y, 30)
            animation.stopAnimation(animation.AnimationTypes.All, sprite_left_crab)
            all_crabs.unshift(sprite_left_crab)
            all_crabs.push(sprite_right_crab)
        }
    })
}
function make_rhythm_stuff () {
    sprite_rhythm_bar = sprites.create(assets.image`rhythm_bar`, SpriteKind.RhythmStuff)
    sprite_rhythm_bar.x = scene.screenWidth() / 2
    sprite_rhythm_bar.top = 16
    sprite_overlapper = sprites.create(assets.image`overlapper`, SpriteKind.RhythmSuccess)
    sprite_overlapper.left = sprite_rhythm_bar.left + 8
    sprite_overlapper.top = sprite_rhythm_bar.top
    sprite_overlapper.z = 2
    sprite_failed_overlapper = sprites.create(assets.image`button_failed_overlapper`, SpriteKind.RhythmFail)
    sprite_failed_overlapper.right = sprite_rhythm_bar.left
    sprite_failed_overlapper.top = sprite_rhythm_bar.top
    sprite_failed_overlapper.setFlag(SpriteFlag.Invisible, true)
}
function setup () {
    prepare_tilemap()
    set_score(0)
    show_score = 0
    update_score()
    button_speed = 50
    current_part = 0
    animation_state = -1
    button_freq = -1
    allowed_buttons = [
    controller.combos.idToString(controller.combos.ID.up),
    controller.combos.idToString(controller.combos.ID.down),
    controller.combos.idToString(controller.combos.ID.left),
    controller.combos.idToString(controller.combos.ID.right)
    ]
    musical = MusicalImages.create_musical_image()
    make_player()
    all_crabs = [sprite_player]
    fish_count = 0
    make_rhythm_stuff()
    count_amazing = 0
    count_awesome = 0
    count_great = 0
    count_good = 0
    count_success = 0
}
function summon_button_press (button: string) {
    sprite_button_press = sprites.create(get_button_image(button), SpriteKind.RhythmButton)
    sprites.setDataString(sprite_button_press, "direction", button)
    sprite_button_press.top = sprite_overlapper.top
    sprite_button_press.right = sprite_rhythm_bar.right
    sprite_button_press.z = 1
    sprite_button_press.vx = button_speed * -1
}
function popup_message (accuracy: number, is_success: boolean) {
    if (!(spriteutils.isDestroyed(sprite_message))) {
        sprite_message.destroy()
    }
    if (is_success) {
        sprite_message = textsprite.create(get_success_message(accuracy), 0, 6)
    } else {
        sprite_message = textsprite.create("Fail", 0, 2)
    }
    sprite_message.top = sprite_overlapper.bottom + 2
    sprite_message.left = sprite_overlapper.x
    sprite_message.lifespan = 1000
}
function get_success_message (accuracy: number) {
    if (accuracy > 90) {
        count_amazing += 1
        return "Amazing!"
    } else if (accuracy > 80) {
        count_awesome += 1
        return "Awesome!"
    } else if (accuracy > 70) {
        count_great += 1
        return "Great"
    } else if (accuracy > 60) {
        count_good += 1
        return "Good"
    } else {
        count_success += 1
        return "Success"
    }
}
function get_button_image (button: string) {
    if (button == controller.combos.idToString(controller.combos.ID.up)) {
        return assets.image`up_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.down)) {
        return assets.image`down_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.left)) {
        return assets.image`left_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.right)) {
        return assets.image`right_button`
    } else {
        return [][0]
    }
}
function part_11 () {
    animation_state = 4
    button_freq = 1000
}
function show_end_screen () {
    make_text("Great job!", scene.screenWidth() / 2, 10)
    make_text("Success: " + count_success + "x", scene.screenWidth() / 2, 30)
    make_text("Good: " + count_good + "x", scene.screenWidth() / 2, 40)
    make_text("Great: " + count_great + "x", scene.screenWidth() / 2, 50)
    make_text("Awesome: " + count_awesome + "x", scene.screenWidth() / 2, 60)
    make_text("Amazing: " + count_amazing + "x", scene.screenWidth() / 2, 70)
    make_text("Total score: " + score, scene.screenWidth() / 2, 90)
    make_text("High score: " + old_high_score, scene.screenWidth() / 2, 100)
    if (score > old_high_score) {
        make_text("New high score!", scene.screenWidth() / 2, 110)
        blockSettings.writeNumber("high_score", score)
    }
}
function remove_crabs (count: number) {
    timer.background(function () {
        for (let index = 0; index < count; index++) {
            sprite_left_crab = all_crabs.shift()
            sprite_left_crab.setFlag(SpriteFlag.AutoDestroy, true)
            animation.runImageAnimation(
            sprite_left_crab,
            assets.animation`crab_right_walking_animation0`,
            200,
            true
            )
            sprite_right_crab = all_crabs.pop()
            sprite_right_crab.setFlag(SpriteFlag.AutoDestroy, true)
            animation.runImageAnimation(
            sprite_right_crab,
            assets.animation`crab_right_walking_animation`,
            200,
            true
            )
            timer.background(function () {
                story.spriteMoveToLocation(sprite_left_crab, -8, sprite_player.y, 30)
                animation.stopAnimation(animation.AnimationTypes.All, sprite_right_crab)
            })
            story.spriteMoveToLocation(sprite_right_crab, scene.screenWidth() + 8, sprite_player.y, 30)
            animation.stopAnimation(animation.AnimationTypes.All, sprite_left_crab)
        }
    })
}
sprites.onOverlap(SpriteKind.RhythmButton, SpriteKind.RhythmSuccess, function (sprite, otherSprite) {
    if (get_button_pressed() != "") {
        if (sprites.readDataString(sprite, "direction") == get_button_pressed()) {
            sprite.setVelocity(0, -100)
            sprite.setFlag(SpriteFlag.Ghost, true)
            timer.after(100, function () {
                sprite.destroy()
            })
            accuracy = Math.map(Math.abs(sprite.x - otherSprite.x), 8, 0, 0, 100)
            if (false) {
                sprite_player.sayText(Math.abs(sprite.x - otherSprite.x))
            }
            if (false) {
                sprite_player.sayText(Math.round(accuracy))
            }
            if (false) {
                sprite_player.sayText(accuracy / 100)
            }
            change_score(Math.round(accuracy))
            popup_message(accuracy, true)
        } else {
            sprite.setVelocity(0, -100)
            sprite.setFlag(SpriteFlag.Ghost, true)
            timer.after(100, function () {
                sprite.destroy()
            })
            popup_message(0, false)
        }
    }
})
function run_part (part: number) {
    if (part < 1 && part > 14) {
        return
    }
    current_part = part
    if (part == 1) {
        part_1()
    } else if (part == 2) {
        part_2_transition()
    } else if (part == 3) {
        part_3()
    } else if (part == 4) {
        part_4_transition()
    } else if (part == 5) {
        part_5()
    } else if (part == 6) {
        part_6()
    } else if (part == 7) {
        part_7_transition()
    } else if (part == 8) {
        part_8()
    } else if (part == 9) {
        part_9_transition()
    } else if (part == 10) {
        part_10_transition()
    } else if (part == 11) {
        part_11()
    } else if (part == 12) {
        part_12()
    } else if (part == 13) {
        part_13()
    } else if (part == 14) {
        part_14()
    }
    MusicalImages.set_queue(musical, get_part_music(part))
    MusicalImages.play(musical)
}
function change_score (s: number) {
    score += s
}
function part_9_transition () {
    animation_state = 3
    button_freq = 1250
    add_crabs(1)
    add_fish(2)
}
function part_13 () {
    animation_state = 1
    button_freq = 1500
    remove_crabs(1)
    remove_fish(1)
}
function part_2_transition () {
    animation_state = 1
    button_freq = 1750
    add_crabs(1)
}
function get_sprite_at (col: number, row: number, kind: number) {
    for (let sprite of sprites.allOfKind(kind)) {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column) == col && tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) == row) {
            return sprite
        }
    }
    return [][0]
}
function part_7_transition () {
    animation_state = 1
    button_freq = 1750
    add_crabs(1)
}
sprites.onOverlap(SpriteKind.RhythmButton, SpriteKind.RhythmFail, function (sprite, otherSprite) {
    sprite.setVelocity(0, 100)
    sprite.setFlag(SpriteFlag.Ghost, true)
    timer.after(100, function () {
        sprite.destroy()
    })
    popup_message(0, false)
})
let frame_delay = 0
let accuracy = 0
let sprite_button_press: Sprite = null
let count_success = 0
let count_good = 0
let count_great = 0
let count_awesome = 0
let count_amazing = 0
let musical: MusicalImages.MusicalImage = null
let allowed_buttons: string[] = []
let current_part = 0
let button_speed = 0
let sprite_failed_overlapper: Sprite = null
let sprite_overlapper: Sprite = null
let sprite_rhythm_bar: Sprite = null
let all_crabs: Sprite[] = []
let sprite_right_crab: Sprite = null
let sprite_left_crab: Sprite = null
let sprite_player: Sprite = null
let sprite_score: TextSprite = null
let right_fish: Sprite = null
let left_fish: Sprite = null
let fish_count = 0
let sprite_message: TextSprite = null
let button_freq = 0
let animation_state = 0
let show_score = 0
let score = 0
let in_game = false
let old_high_score = 0
color.setPalette(
color.Black
)
stats.turnStats(true)
pause(100)
if (!(blockSettings.exists("high_score"))) {
    blockSettings.writeNumber("high_score", 0)
}
old_high_score = blockSettings.readNumber("high_score")
setup()
music.setVolume(20)
if (controller.B.isPressed()) {
    fade_out(true)
    if (game.ask("Reset high score?")) {
        blockSettings.clear()
        game.showLongText("Successfully reset high score!", DialogLayout.Bottom)
    }
    fade_in(true)
    game.reset()
}
timer.background(function () {
    fade_out(true)
    in_game = true
    if (true) {
        for (let index = 0; index <= 13; index++) {
            run_part(index + 1)
        }
    }
    while (score != show_score) {
        pause(100)
    }
    in_game = false
    pause(1000)
    fade_in(true)
    cleanup()
    pause(1000)
    fade_out(false)
    show_end_screen()
})
forever(function () {
    if (animation_state == -1) {
        for (let crab of all_crabs) {
            animation.stopAnimation(animation.AnimationTypes.All, crab)
        }
        pause(20)
    } else if (animation_state <= 3) {
        if (animation_state == 0) {
            frame_delay = 200
        } else if (animation_state == 1) {
            frame_delay = 166
        } else if (animation_state == 2) {
            frame_delay = 133
        } else {
            frame_delay = 100
        }
        for (let crab of all_crabs) {
            if (sprites.readDataBoolean(crab, "facing_left")) {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_right_walking_animation0`,
                frame_delay,
                false
                )
            } else {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_right_walking_animation`,
                frame_delay,
                false
                )
            }
        }
        pause(assets.animation`crab_right_walking_animation0`.length * frame_delay)
    } else {
        for (let crab of all_crabs) {
            if (sprites.readDataBoolean(crab, "facing_left")) {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_attack_left`,
                100,
                false
                )
            } else {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_right_attack`,
                100,
                false
                )
            }
        }
        pause(assets.animation`crab_attack_left`.length * 100)
    }
})
forever(function () {
    if (button_freq != -1) {
        summon_button_press(allowed_buttons._pickRandom())
        pause(randint(button_freq - 500, button_freq + 500))
    }
})
game.onUpdateInterval(20, function () {
    if (in_game) {
        if (score > show_score) {
            if (score - show_score > 20) {
                show_score += 3
            } else {
                show_score += 1
            }
            update_score()
        }
    }
})
