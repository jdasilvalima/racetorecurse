class Message {

    getMessageForCollider(colliderName) {
        const messages = this.loadMessages2();
        const foundMessage = messages.find(item => item.colliderName === colliderName);
        return foundMessage ? foundMessage.message : "GAME OVER";
    }

    loadMessages2() {
        return [
            { colliderName: "levainCookie", message: "GAME OVER - Oh nooo! The irresistible Levain Cookie got the better of you. That first-day glory at the Recurse Center will have to wait while you savor that last bite!" },
            { colliderName: "iceCreamLover", message: "GAME OVER - An ice cream detour? Classic. But now you're fashionably late to the Recurse Center. Hope it was worth the brain freeze!" },
            { colliderName: "cuteShiba", message: "GAME OVER - Who could resist a baby Shiba's fluffy charm? Not you! You got lost in cuddles and missed the clock. The Recurse Center will understand... right?" },
            { colliderName: "nycPizza", message: "GAME OVER - The quest for the ultimate NYC pizza strikes again! Unfortunately, your taste test took priority over punctuality. Recurse Center's loss, pizza's gain!" },
            { colliderName: "nycRat", message: "GAME OVER - Yikes! A NYC subway rat ambush has delayed your grand entrance at the Recurse Center. Better luck next time, urban warrior!" },
            { colliderName: "theRecurseCenter", message: "WINNER - You made it! Right on time for your new adventure at the Recurse Center =D" }
        ]
    }
}