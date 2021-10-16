// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: users;


CONFIG = {
    // ID of the server
    server_id: "211509689085722625",

    // Favorites will be sorted to the top
    favorites: [],

    // Filter members
    filter: ["Pollmaster"],

    // if true, filter will exclude, otherwise include
    exclude: true
}

// No need to edit these, they are for testing the script 
DEBUG = {
    enabled: false,
    widgetFamily: "medium",
    memberCount: 20
}

class DiscordWidget {
    isSmallWidget = false
    isMediumWidget = false
    isLargeWidget = false


    constructor() {
        this.txtColor = new Color("FFFFFF")
        this.mutedColor = new Color("EDEDED")
        this.bgColor = Color.dynamic(new Color("5865F2"), new Color("2F3136"))

        switch (config.widgetFamily ?? DEBUG.widgetFamily) {
            case "small": this.isSmallWidget = true; break
            case "medium": this.isMediumWidget = true; break
            case "large": this.isLargeWidget = true; break
        }

    }

    async run() {
        let widget = await this.createWidget()
        if (!config.runsInWidget) {
            switch (DEBUG.widgetFamily) {
                case "small": await widget.presentSmall(); break
                case "medium": await widget.presentMedium(); break
                case "large": await widget.presentLarge(); break
            }
        }
        Script.setWidget(widget)
        Script.complete()
    }

    // Create Widget
    async createWidget() {
        let server = await this.loadServerInfo()
        
        let widget = new ListWidget()
        widget.setPadding(14, 14, 14, 14)
        widget.backgroundColor = this.bgColor

        if (server.error) {
            widget.addText(server.error)
            return
        }
        

        let stack = widget.addStack()
        stack.layoutVertically()
        stack.spacing = 4

        await this.createWidgetHeader(stack, server)
        await this.createWidgetMemberList(stack, server)
        widget.addSpacer()

        return widget
    }

    // Create the header for the widget
    async createWidgetHeader(widget, server) {
        let header = widget.addStack()
        header.layoutHorizontally()
        header.centerAlignContent()

        // Header Image
        let img = await this.loadImage("https://discord.com/assets/9f6f9cd156ce35e2d94c0e62e3eff462.png")
        let icon = header.addImage(img)
        icon.resizable = true
        icon.imageSize = new Size(25, 25)

        header.addSpacer()

        // Header Text (servername + member count, add "online" if widget is not small)
        let label = server.name + (!this.isSmallWidget ? "  (" + server.count + " online)" : "")
        let text = header.addText(label)
        text.font = Font.boldSystemFont(13)
        text.textColor = this.txtColor
        text.lineLimit = 1
        text.minimumScaleFactor = 0.5
    }


    // Create the Member List for the widget
    async createWidgetMemberList(widget, server) {
        // If running in small or large widget, show only one column,
        // otherwise show two column layout
        if (this.isSmallWidget || this.isLargeWidget) {
            let list = widget.addStack()
            list.layoutVertically()
            list.centerAlignContent()
            list.spacing = 4

            let maxListLength = this.isSmallWidget ? 5 : 13
            let listLength = server.members.length > maxListLength ? maxListLength-1 : server.members.length

            // Add List
            await this.createMemberList(list, server.members.slice(0, listLength))
            let restMembers = server.members.slice(listLength)
            
            // Add Bottom Icon Row
            if (restMembers.length != 0) {
                let iconRow = widget.addStack()
                iconRow.layoutHorizontally()
                iconRow.centerAlignContent()
                iconRow.spacing = 4
                
                let rowLength = (restMembers.length > 5) ? 4 : restMembers.length
                
                for (var i=0; i < rowLength; i++) {
                    let member = restMembers[i]
                    var status_color = this.txtColor
                    switch (member.status) {
                        case "online": status_color = new Color("57F287"); break
                        case "idle": status_color = new Color("FEE75C"); break
                    }

                    let img = await this.loadImage(member.avatar)
                    let icon = iconRow.addImage(img)
                    icon.resizable = true
                    icon.imageSize = new Size(20, 20)
                    icon.cornerRadius = 10
                    icon.borderWidth = 4
                    icon.borderColor = status_color
                }

                // Add +n if necessary
                if (restMembers.length > 5) {
                    let text = iconRow.addText("+"+(restMembers.length-rowLength))
                    text.font = Font.regularSystemFont(12)
                    text.textColor = this.mutedColor
                }
            }
        } else {
            let cols = widget.addStack()
            cols.layoutHorizontally()
            cols.centerAlignContent()
            cols.spacing = 10

            // Make Lists for columns
            for (var i=0; i<2; i++) {
                let list = cols.addStack()
                list.layoutVertically()
                list.centerAlignContent()
                list.spacing = 4

                await this.createMemberList(list, server.members.slice(0+(5*i), 5+(5*i) - ((server.members.length > 10 && i == 1) ? 1 : 0)))

                if (i == 1 && server.members.length > 10) {
                    let text = list.addText("+"+(server.members.length-9)+" others")
                    text.font = Font.regularSystemFont(12)
                    text.textColor = this.mutedColor
                }
            }
        }
    }

    async createMemberList(parent, members) {
        for (let i = 0; i < members.length; i++) {
            let member = members[i]
            let stack = parent.addStack()
            stack.layoutHorizontally()
            stack.centerAlignContent()
            stack.spacing = 10

            // Color for Status
            var status_color = this.txtColor
            switch (member.status) {
                case "online": status_color = new Color("57F287"); break
                case "idle": status_color = new Color("FEE75C"); break
            }

            // Icon
            let img = await this.loadImage(member.avatar)
            let icon = stack.addImage(img)
            icon.resizable = true
            icon.imageSize = new Size(16, 16)
            icon.cornerRadius = 8
            icon.borderWidth = 4
            icon.borderColor = status_color

            // Name
            let text = stack.addText(member.name)
            text.font = Font.regularSystemFont(12)
            text.textColor = this.txtColor
            text.lineLimit = 1

            // Game
            if (this.isLargeWidget && member.game) {
                let game = stack.addText("(" + member.game + ")")
                game.font = Font.regularSystemFont(12)
                game.textColor = this.txtColor //TODO this.mutedColor
                game.lineLimit = 1
            }
        }
    }


    // Load Widget.json from Discord API
    async loadServerInfo() {
        let url = "https://discord.com/api/guilds/" + CONFIG.server_id + "/widget.json"
        let req = new Request(url)
        let json = await req.loadJSON()

        var members = json["members"]
            .map(member => {
                return {
                    id: member["id"],
                    name: member["username"],
                    status: member["status"],
                    game: (member["game"] !== undefined) ? member["game"]["name"] : undefined,
                    avatar: member["avatar_url"]
                }
            })
            // Apply Filters
            .filter(member => (CONFIG.exclude ? !CONFIG.filter.includes(member.name) : CONFIG.filter.includes(member.name)))
            // Sort favorites to top
            .sort((a, b) => {
                let a_prio = CONFIG.favorites.includes(a.name)
                let b_prio = CONFIG.favorites.includes(b.name)
                return (a_prio !== b_prio && a_prio < b_prio) || (a_prio === b_prio && a.id > b.id)
            })
        
        if (DEBUG.enabled) {
            let member = json["members"][0]
            members = []
    
            for (var i = 0; i < DEBUG.memberCount; i++) {
                members.push({
                    id: i,
                    name: "Member " + i,
                    status: i % 2 == 0 ? "online" : "idle",
                    game: i % 3 == 0 ? "League of Legends" : "",
                    avatar: member["avatar_url"]
                })
            }
    
            console.log(members)
        }

        let data = {
            name: json["name"],
            count: json["presence_count"],
            members: members,
            error: json["message"]
        }

        return data
    }


    // Load Image from URL / Load Cached if possible
    async loadImage(url) {
        let fm = FileManager.iCloud()
		let cache_dir = fm.documentsDirectory() + "/DiscordServer"

		if (!fm.isDirectory(cache_dir)) {
			console.log("Initializing Cache Directory")
			fm.createDirectory(cache_dir, true)
		}

        let cache_file = cache_dir + "/" + encodeURIComponent(url)

		var image = undefined
		if (fm.fileExists(cache_file)) {
			image = Image.fromFile(cache_file)
			if (image === null) {
				console.error("Couldn't load imgData from cache. redownloading")
				let data = await (new Request(url)).load()
                image = Image.fromData(data)
				fm.write(cache_file, data)
                this.loadImage(url)
			}
		} else {
			let data = await (new Request(url)).load()
            image = Image.fromData(data)
			fm.write(cache_file, data)
		}

        return image
    }
}

await new DiscordWidget().run();