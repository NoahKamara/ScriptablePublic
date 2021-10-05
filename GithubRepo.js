// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: code-branch;

class Configuration {
    // Earliest Commit (Currently Date - 90 Days)
    static earliestCommit = new Date((new Date()).getTime() - 30*24*60*60*1000);
    static githubToken = nil;
}

class GithubRepoWidget {
    repo = "abjc/abjc-tvos"

    constructor() {
        let colorDark = "#181717"
        let colorLight = "#FFFFFF"

        this.apiBaseUrl = "https://api.github.com";
        let isDark = true
        if (isDark) {
            // Icons
            this.ghIcon = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB9klEQVRIiaXVS4iOYRjG8fv95sSYQ6FklIyZUhazcSasJEpoUpMFZYqFKKeylL2FHdlIUigkRdloLJTYiIWkQQ05zFhPjflZzDfN65n38803c++e677u//U+z3vKokqhMyJ2RUR3RCwpy98j4kNEPM6y7FM1RiXwPrxWvV5hby3gZRiYATitZ+ioBl+LoVnAJ2sIayrBV+DHHOCT9QtdKXwe3uZMD9GHexj/D2wct3EAT3P6GzTlA84kg/253hYcxUZ0YiU24RjW53ynE8apyUYLhpPmkRk/FVMBJwuOqqUUE8/4wsTfWmtARCxI1osiYmfgZpL8HvWz2EETPiesG6WI6Em8t7IsG6s1IMuy0Yi4k8g9pYhYmoiDtcJz9TFZd5Qioi0Rm+cQkN6H9lJEjCRiV8y+upP1cCmmH8kelGoloyEidifyYCkinifiqog4XmtARJyNiOWJNhDYMP0LYAzn/3ndK195My7iTwFn3aTpZVm4gO34Vl7/xF30FoAP4QF+F4DhRd681dRH7QS2YTRn3lEQ0FsBrLybzenA5XJzBO1YjXM4rODNNvFjqlSXis6yHo/KhidYXOXsWyvA76Ou0lAjrpeNo3iHwaIBtBXArxbttiioD19zgw0FnvZc/wv2VwUngPnoxxVkBf06XMNBNFbi/AU7d6Kvo9J7nQAAAABJRU5ErkJggg=="
            this.ghIconIssue = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABvElEQVRIibWVu24TURCGv0PlNEDcIHAkKAERJOIK3gCZ2xtwKagRRRTBAyAhEOJB7Dg8BAFZ1HQE4ohLlXUaRMNHkQlZJevdtROPtNLuXP5/Zs7sHJixpDKj2gTuAXeAi8BCmLaAz8A7oJ9S2p6IQJ0DngLLwElgA1gHfoXLGeAGcAEYAS+BNyml35UlqQvqJ/Wv2lWXSnyX1J67MlBbdcC31Ey9WZnNflwnYoZjSdS5yDxTr9QFz8UvRuxAbRQ5PI+21M68AONWtGvloKGpjtTutOA5rNWoZD6vfBTM146BoB1YD/LKvvrlqOA5vK9qD+BE6C4BHyqCOjFhwxrntA5czgfvqK8qCIbuy2aF72t1J1/BzGSP4AdwrsL3Mbs7aBjvZdICvv//itHamDLJQxKH3M0rHkZvx+6dCcD3xvR+XtmMn6N3DAR9dVs9fdDwLFZF5wjgtyP75SJjIxZVpi5OAX411s3HwmUXTq2Y99EklUTmI3VTLZ/GIBlEqatqu8S3HT03Mj8EPu7KbABPgBXgFPANeA/8DJezwHXgPJABL4C3KaU/tQhyRPPA3XiKLv01YC2llJXhzFT+ARJTrG7rSPLuAAAAAElFTkSuQmCC"
            this.ghIconStar = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABsklEQVRIidWUOy9EURSF1xaFAgWFd5iIUZjGD/AL/AhqCgqJelSi8EgQZLxKPf6GxihMJB6tKEa8k/kUsy83g5lzQ2MnJ/dm77XXWudknyMlCGAamErSk4S8G3gGXoDe0L66BBqzksz/ZxK5qxVAB/AIbAJbwBPQ9ZcCy8ArkAJ6/ZiW/oq8DXgAcrHctu+i87fkDcAq8Ab0x/L9nlsFGqpxmDf0SRqSlJY0EFs9Kg/CvpmNV4jvSRqTVJJ0I6kQW+eS8mZ2aUBK0oU+J+SuAliQdGRm9xUCTZJG3UjcWEsEkZQSYD4ZABs1z61GABvOtQVYlDRgxQvrH4VkxAYsRkaBumqAzS+A2uSRwbWqBoE5B+ZCRJx8zXsWQh1FIhMB2EnHzn1X/8nhrn9fA/xEmJ0kAhn/ngYIRJjMd8WfBIZUnuOzeNIfvY4KbN6xiQQykq7MrOjErcC8yhfy0qesXZIcc+2mwgI4AQ6BZiALFP3tyfl681zWMYfASSh5vb+UeeAWKAEHwGAMM+i5kmPy3lMfIpDmM46B4SrYYcdEkQ4RaPRbORK05XLPiPc0hvb8n3gHRCXiyIC2CgcAAAAASUVORK5CYII="
            this.ghIconPull = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRIie2Vuy5EURSG/y0UkhGjcClNJ1RmEnF7BdReAQm9wngBGSXiCTQmKhRERESEbobEtXSLgkLlU1hjtm0OcxI6q9lnr73+/z97nbPWkv7YnL8BMpIGJd1KWnPOPYcAYFjSmXOuEEsJmAVeKdsFkApipuxsOi55xsgXgEagH7gHViuQrwB1cQVK4KTnywGP9jxItL0AO0B3Je5aW29s7ZS0Z89dnr8g6URSh6QtSQceR72kEUn7QK9z7rjSDRKW83tgHti0txvzYtqAIvAE9AT4JHAFbH+XphSwale+BsaA8C9rAw6ByQr4OeAlUsALBMj+GPgVlwUI/TVxieLav8C/wC+aFVreK7TxsNAicA6YAG6tYebDLiygAbi0VpED1q3gxqsQmLDYDWDZOC6AhB80akF9nm8DOKlC4BRY9/b9xjUqlb9Bi61FD1uQ1PqTgGF9XNHzf6imLX+LQBMwADzgDZxvbpC3tAwYdsm40mFgls8j8xxor0IgZTkv2SswUzoP23Fa70P/ThFDP0IkIWlIUrOkXefcUTW4X7E3/wfsZwxc4EoAAAAASUVORK5CYII="

            // Colors
            this.fgColor = new Color(colorLight)
            this.bgColor = new Color(colorDark)
        } else {
            // Icons
            this.ghIcon = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABZVBMVEUAAAAAAAAAAAAAAAAAAAAAAAArKyskJCQgICAcHBwaGhoVFRUUFBQSEhIREREaGhoUFBQcExMYGBgXFxcXFxcWFhYYGBgZGRkZGRkYGBgYGBgXFxcXFxcWFhYWFhYaFhYZFRUZGRkYGBgWFhYXFxcaFhYZFhYZFhYYGBgXFxcXFxcYFhYYGBgXFxcXFxcZFxcZFhYZFhYYFhYYGBgXFxcXFxcXFxcZFxcZFhYYFhYYGBgXFxcXFxcYFhYYGBgYGBgZFxcYFhYYGBgYGBgXFxcZFxcYGBgXFxcXFxcZFxcYFhYYGBgXFxcZFxcYFxcYFhYXFxcXFxcZFxcYFxcYFxcYGBgZFxcYFxcYFhYZFxcYFxcYFxcYFxcYFxcYFhYZFxcYFxcYFxcYFxcYFhYYGBgYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcXFxcYFxcYFxcYFxcYFxcYFxf///8SR9N/AAAAdXRSTlMAAQIDBAUGBwgJCgwNDg8UGhsgISIjKjM0NTY3ODk6Oz0+P0VPUFFTVVhaXl9iY2ZnaGlqbW5vcXJzdXh5f4CCh4mLjY6Rl5iZm6CipKWpq66vsLK0uLvAwsXGx8rMzdDS1NXY2d/h4uXm5+rr7O3u7/n8/f4y3zobAAAAAWJLR0R2MWPJQQAAARFJREFUGBldwQc7QmEAhuGXIkRk70323luy996bJDN6/r+voy7nuG+lFA2GNjdDA4Vyarki6bJZf/wn2BwXKKk8gkOkTJbCF/55K5GRdQv77TtxLPGttiO48UgaB3qkut7qouKavkppDBiVvO9At2yGgTev2jBGZDOFEdAG8OCWjScMrOsGmJZDELjWK9Aph37gRTGgXw7jQExRICiHJeBZZ8B9umwywsCp5jGGZDOFMacqjK9Jj5JyZr8xKqQLZhqjvG4HZHTufZJwLqk+zlBDDJpkBLB818pY5MNXOtHlluHHsqAE9wGH+fqVS8KuS5bMNWJ3jy4ZeRgrbqW0P0OGDB88tcomu2c5TYZrtSNTlh/vKHFH72KWfQAAAABJRU5ErkJggg=="
            this.ghIconIssue = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAt1BMVEUAAAAkJCQgICAcHBwgEBAeHh4cHBwUFBQcExMbGxsXFxcXFxcWFhYaFRUaGhoZGRkZFRUYGBgYGBgXFxcXFxcYGBgYGBgYGBgXFxcYGBgXFxcXFxcZFxcYGBgYGBgXFxcZFxcZFxcYFxcYFxcYGBgXFxcXFxcZFxcYFxcYFxcYFhYYFxcYFhYYGBgYFxcYFxcYFxcYFxcYFhYXFxcXFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxf////WI4ukAAAAO3RSTlMABwgJEBESGhscLC0uMTIzSElLTE1fYGFidnh6e4yNjqWmp6itrq+wycvN19jZ3t/g4uPk7/Dx8vP0/j6LX0IAAAABYktHRDynamHPAAAA5klEQVQYGYXB65qBUBiA0XdyyphhapxPYVQip9iF7/7va2h7PMkPa/FOueuH53PodUpkFYaxbCaOM9mKGhR4qC4v8zqpuiuByV31oCwebBWZpApL9UlGTQUGN8OLxZNf6XNVjufkeKoEdOWbnIa0AX/Di50LrKdo9iGy0GYhkIzQIpE92jgBkhFaJLJHGyfAeopmRfsftL8Q8La82M2BjtTJaUgLKCuXHP9Y5GpwsXnSlB43RqBqZHzFC4OUGcU2D814X+HODMRrkGr4sqjwYPSV7KaOM9vJsfdBVqntrU6nldsq8sY/IB0X8j6+xP4AAAAASUVORK5CYII="
            this.ghIconStar = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA81BMVEUAAAAAAAAAAAAAAAAgICAVFRUUFBQSEhIbGxsWFhYVFRUUFBQUFBQcExMbGxsZGRkYGBgXFxcWFhYbFBQaGhoaFRUXFxcWFhYZFRUYGBgXFxcXFxcXFxcXFxcZFxcYGBgYGBgXFxcZFxcZFxcXFxcYFhYYGBgYGBgYFxcYFhYXFxcXFxcZFxcZFxcYFxcYFhYYFhYYGBgXFxcXFxcXFxcZFxcYFxcYFhYXFxcXFxcYFxcYFxcYFhYZFxcYFxcXFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxf////6a2eWAAAAT3RSTlMAAQIECAwNDhMXGBkaGxwfICEjJicxODk9S0xNWGRlamtvcHF4fYGCiIqOj5CRk5SVlpiZmpydoKOkqbS2u8jP1d/g7O3y9fb3+Pn6+/3+9oP0CQAAAAFiS0dEUONuTLwAAADzSURBVBgZncFXVsJQFEDR82hRUekKipWmaOgRpEuRGEPu/GcjSyFhAV/uzZbHBw46/7IiHFKxrAoHhBfNlnnGvtfvWMR6Yc/xpwFv5ik7AlU7DnG7GmAjmsnVB5OltFlpy3IyqOcyUYg5IrNhp5ANsRLKFjrDmYgTQbWkwY6GtBQoXeqKLaosDR8rqixNHy6lS03xpySGjzVVk2dcJblj7V5KeGJyw9qtRPFcywVrl3KFJ+9oQDgMaE4ez/sHHD0trOYJTDp4Rj2tOLcNw54Xtd4Il98cT51uEpJdZzo2/WwkRPopfqX6Igk2gnoaV1oP8i8/ZSMhpymZvsQAAAAASUVORK5CYII="
            this.ghIconPull = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA0lBMVEUAAAAAAAAAAAAVFRUUFBQREREgEBAeHh4cHBwVFRUYGBgXFxcYGBgaFRUaGhoZGRkYGBgWFhYWFhYaFhYaFRUXFxcXFxcYGBgYGBgYGBgXFxcXFxcZFxcZFxcYFhYYGBgYGBgYFxcXFxcZFxcZFxcXFxcXFxcZFxcYFxcYFhYZFxcYFxcXFxcZFxcZGRkZFxcYFxcYFxcYFhYYFxcYFxcYFhYYGBgYFxcYFxcYFxcYFxcYFxcYFxcYFxcYFxcXFxcYFxcYFxcYFxcYFxcYFxf///9nLN5BAAAARHRSTlMAAQUMDQ8QERIYICEqMTIzNjk6OzxOWWprbG5vcHt/gIGIjpCRmZqbnauwsbm6uru+wMLM19jZ3d7f4OHq7O3v8/j5/vpti8UAAAABYktHREWOs6hXAAAA3klEQVQoz9WS21aCYBCFP6Iko6iw8ABFhJ3AsoMWaaT07/d/pi6Elt5431zN2t/M2mvNbNhSx2FgA3B+uKFfGalwgUgXG/PmZs8vM4j0sLMOIrUgXXAmSVL1elSDQD6Mp+xP9JwkyXD2UxO7KIdjdaE9WZ4ArdlLveJm1bxrAe23EOC6+rNRvG4a638CN6/mPauRrf6XyV2A3c8yHanXgL6e7svCBgKdwuO0Ae8j8BUAYX32uhYpOAoBz9w6ne+sAXnZce6MBxAb6eOgAW4hmctV7w3qMKz+Ewy8bdH5BZbIHsshuwp5AAAAAElFTkSuQmCC"

            // Colors
            this.fgColor = new Color(colorDark)
            this.bgColor = new Color(colorLight)
        }
    }

    async run() {
        await this.initCache()

        let widget = await this.createWidget()
        widget.backgroundColor = this.bgColor
        if (!config.runsInWidget) {
            await widget.presentSmall()
        }
        Script.setWidget(widget)
        Script.complete()
    }

    async createWidget() {
        let data = await this.loadCache()

        // Basic widget setup
        let widget = new ListWidget()
        widget.setPadding(18,0,18,0)

        // Widget Header
        if (true) {
            let headerStack = widget.addStack()
            headerStack.layoutHorizontally()
            headerStack.topAlignContent()
            headerStack.setPadding(0,18,0,18)

            // Header Image
            let image = await this.imageFromBase64(this.ghIcon)
            let headerIcon = headerStack.addImage(image)
            headerIcon.resizable = true
            headerIcon.imageSize = new Size(18, 18)
            headerStack.addSpacer()

            // Header Text
            console.log("Creating Header")
            let headerText = headerStack.addText(data["repo"])
            headerText.font = Font.boldSystemFont(13)
            headerText.textColor = this.fgColor
        }

        function addIconAndText(widget, icon, text, color) {
            // ISSUES
            let iconAndTextStack = widget.addStack()
            iconAndTextStack.spacing = 4
            iconAndTextStack.centerAlignContent()
            
            // Icon
            let iconUI = iconAndTextStack.addImage(icon)
            iconUI.resizable = true
            iconUI.imageSize = new Size(13, 13)

            // Text
            let txtUI = iconAndTextStack.addText(String(text))
            txtUI.font = Font.boldSystemFont(18)
            txtUI.textColor = color
            txtUI.textOpacity = 0.8
        }        

        widget.addSpacer()

        // Latest Commit
        if (true) {
            let latestCommit = await this.loadCommit()
            let lastCommitStack = widget.addStack()
            lastCommitStack.layoutVertically()
            lastCommitStack.centerAlignContent()
            lastCommitStack.spacing = 0
            lastCommitStack.setPadding(0,20,0,20)

            // Label
            let df = new DateFormatter()
            df.useShortTimeStyle()
            df.useShortDateStyle()
            let dateString = df.string(new Date())

            let dateLbl = lastCommitStack.addText(dateString)
            dateLbl.font = Font.regularSystemFont(9)
            dateLbl.textColor = this.fgColor
            dateLbl.textOpacity = 0.8

            let msgLbl = lastCommitStack.addText(latestCommit.message)
            msgLbl.font = Font.regularSystemFont(11)
            msgLbl.lineLimit = 2
            msgLbl.textColor = this.fgColor
            
            // Text
            let byLabel = lastCommitStack.addText("by "+latestCommit.author)
            byLabel.font = Font.regularSystemFont(9)
            byLabel.textColor = this.fgColor
            byLabel.textOpacity = 0.8
        }

        widget.addSpacer()

        let commitHistory = await this.loadCommitTimeline()
        console.log(commitHistory)

        // // Chart
        // let chart = new LineChart(400, 80, commitHistory).configure((ctx, path) => {
        //     ctx.opaque = false;
        //     ctx.setFillColor(new Color("888888", .25));
        //     ctx.addPath(path);
        //     ctx.fillPath(path);
        // }).getImage();
        // let chartStack = widget.addStack()
        // // chartStack.setPadding(10, 0, 0, 0)
        // let img = chartStack.addImage(chart)
        // img.applyFittingContentMode()

        // widget.addSpacer()

        // Widget Data Row
        if (true) {
            let extraDataStack = widget.addStack()
            extraDataStack.layoutHorizontally()
            extraDataStack.bottomAlignContent()
            extraDataStack.setPadding(0,18,0,18)
            
            addIconAndText(extraDataStack, await this.imageFromBase64(this.ghIconIssue), data["issues"], this.fgColor)
            extraDataStack.addSpacer()
            addIconAndText(extraDataStack, await this.imageFromBase64(this.ghIconStar), data["stars"], this.fgColor)
            extraDataStack.addSpacer()
            addIconAndText(extraDataStack, await this.imageFromBase64(this.ghIconPull), data["pulls"], this.fgColor)
        }
        
        return widget
    }

    // Initialize Cache
    async initCache() {
        console.log("Initializing Cache")
        let repo = this.repo

        let fm = FileManager.iCloud()

        // Paths
        let repo_dir = fm.documentsDirectory() + "/" + repo
        let repo_json = repo_dir + "/data.json"
        let repo_img = repo_dir + "/img.png"

        // Test if Cache exists, create directory if not
        if (!fm.isDirectory(repo_dir)) {
            console.log("Initializing Directory")
            fm.createDirectory(repo_dir, true)
        }

        // // Update data.json
        // let repo_data = await this.loadData()
        // fm.writeString(repo_json, JSON.stringify(repo_data))

        // Test if img is saved, download if not
        if (!fm.fileExists(repo_img)) {
            let avatar_url = repo_data["owner"]["avatar"]
            console.log(avatar_url)
            let img_data = await makeRequest(avatar_url).load()
            fm.write(repo_img, img_data)
        }
    }

    makeRequest(url) {
        let req = new Request(url)
        if (Configuration.githubToken != null) {
            req.headers = {
                "Authorization": "token "+Configuration.githubToken
            }
            console.log("TOKEN: '"+"token "+Configuration.githubToken+"'")
        }
        return req
    }

    // Load Data from Cache
    async loadCache() {
        console.log("Loading from Cache")
        let fm = FileManager.iCloud()

        let repo = this.repo
        let path = fm.documentsDirectory() + "/" + repo + "/data.json"

        return JSON.parse(fm.readString(path))
    }

    // Save Data to Cache
    async saveCache(data) {
        console.log("Saving to Cache")
        let fm = FileManager.iCloud()

        let repo = this.repo
        let path = fm.documentsDirectory() + "/" + repo + "/data.json"
        // Update data.json
        fm.writeString(path, JSON.stringify(data))
    }

    // Fetch Data from API
    async loadData() {
        console.log("Loading Data")
        let repo = this.repo
        let pulls_data = await this.makeRequest(this.apiBaseUrl + "/repos/" + repo + "/pulls" + "?state=open").loadJSON()
        let repo_data = await this.makeRequest(this.apiBaseUrl + "/repos/" + repo).loadJSON()
        let data = {
            "repo": repo_data["name"],
            "description": repo_data["description"],
            "owner": {
                "name": repo_data["owner"]["login"],
                "avatar": repo_data["owner"]["avatar_url"]
            },
            "issues": repo_data["open_issues_count"],
            "stars": repo_data["stargazers_count"],
            "subscribers": repo_data["subscribers_count"],
            "pulls": Array(pulls_data).length,
        }

        await this.saveCache(data)
        return data
    }


    // Load Latest Commit
    async loadCommit() {
        let data = await this.makeRequest(this.apiBaseUrl + "/repos/" + this.repo + "/commits").loadJSON()
        let latest = data[0]

        console.log(Date(latest["commit"]["committer"]["date"].slice(0,10)))
        
        return {
            author: latest["commit"]["author"]["name"],
            message: latest["commit"]["message"],
            date: Date(latest["commit"]["committer"]["date"].slice(0,10))
        }
    }
    // Load Commit History
    async loadCommitTimeline() {
        function dateParser(string) {
            let df = new DateFormatter()
            df.dateFormat = "yyyy-MM-dd"
            return df.date(string)
        }
        console.log("Loading Commits")
        let data = await this.makeRequest(this.apiBaseUrl + "/repos/" + this.repo + "/commits" + "?since=" + Configuration.earliestCommit.toISOString()).loadJSON()
        console.log(data)

        let startDate = Number(Configuration.earliestCommit) - Configuration.earliestCommit.getTime() % (3600 * 1000 * 24)
        let endDate = Number(new Date())
        var date = startDate
        
        
        var timeline = {}
        
        while (date < endDate) {
            let strDate = new Date(date).toISOString().substring(0, 10)
            timeline[strDate] = 0
            date = date + 86400000
        }
      
        data.forEach(commit => {
          let date = commit["commit"]["committer"]["date"].slice(0,10)
          timeline[date] += 1
        })

        var values = Object.keys(timeline).map(function(key){
            return timeline[key];
        });

        return values
    }

    // Load Image from File
    async imageFromBase64(base64String) {
        let data = Data.fromBase64String(base64String)
        let image = Image.fromData(data)
        return image
    }
}

class LineChart {

    constructor(width, height, values) {
      this.ctx = new DrawContext()
      this.ctx.size = new Size(width, height)
      this.values = values;
    }
    
    _calculatePath() {
      let maxValue = Math.max(...this.values);
      let minValue = Math.min(...this.values);
      let difference = maxValue - minValue;
      let count = this.values.length;
      let step = this.ctx.size.width / (count - 1);
      let points = this.values.map((current, index, all) => {
          let x = step*index
          let y = this.ctx.size.height - (current - minValue) / difference * this.ctx.size.height;
          return new Point(x, y)
      });
      return this._getSmoothPath(points);
    }
        
    _getSmoothPath(points) {
      let path = new Path()
      path.move(new Point(0, this.ctx.size.height));
      path.addLine(points[0]);
      for(var i = 0; i < points.length-1; i ++) {
        let xAvg = (points[i].x + points[i+1].x) / 2;
        let yAvg = (points[i].y + points[i+1].y) / 2;
        let avg = new Point(xAvg, yAvg);
        let cp1 = new Point((xAvg + points[i].x) / 2, points[i].y);
        let next = new Point(points[i+1].x, points[i+1].y);
        let cp2 = new Point((xAvg + points[i+1].x) / 2, points[i+1].y);
        path.addQuadCurve(avg, cp1);
        path.addQuadCurve(next, cp2);
      }
      path.addLine(new Point(this.ctx.size.width, this.ctx.size.height))
      path.closeSubpath()
      return path;
    }
    
    configure(fn) {
      let path = this._calculatePath()
      if(fn) {
        fn(this.ctx, path);
      } else {
        this.ctx.addPath(path);
        this.ctx.fillPath(path);
      }
      return this.ctx;
    }
  
  }


await new GithubRepoWidget().run();
