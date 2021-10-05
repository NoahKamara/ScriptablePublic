// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: kiss-beam;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: plus-square;


// CONFIGURATION

let REGION = "Baden-Württemberg";
let SUBREGION = "Mittelgebirge Baden-Württemberg";
let POLLEN = "Roggen"


// Helper Functions
function partial(func /*, 0..n args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var allArguments = args.concat(Array.prototype.slice.call(arguments));
        return func.apply(this, allArguments);
    };
}

class Pollenflug {
    legend = {
        severity: {
            "1": "LOW",
            "1-2": "LOW\nMEDIUM",
            "2": "MEDIUM",
            "2-3": "MEDIUM\nHIGH",
            "3": "HIGH"
        },
        pollen: {
            "Esche": "Esche",
            "Hasel": "Hasel",
            "Graeser": "Gräser",
            "Erle": "Erle",
            "Ambrosia": "Ambrosia",
            "Birke": "Birke",
            "Roggen": "Roggen",
            "Beifuss": "Beifuss"
        }
    }

    async run() {
        let widget = await this.deployWidget();

        if (!config.runsInWidget) {
            widget.presentSmall();
        } else {
            Script.setWidget(widget);
        }

        Script.complete();
    }

    async deployWidget() {
        var log = partial(this.logger, "deployWidget")
        let widget = new ListWidget()

        // widget.setPadding(15, 15, 15, 15)

        let data = await this.fetchAPI()
        log("Data received")

        // Title
        let titleTxt = widget.addText("👃 " + this.legend.pollen[POLLEN]);
        titleTxt.font = Font.mediumSystemFont(13);
        titleTxt.centerAlignText()

        widget.addSpacer()

        // Check if Data is Null
        if (!data) {
            log("Data is Null")
            return widget
        }

        let severity_tdy = this.legend.severity[data.today]
        let severity_tmr = this.legend.severity[data.tomorrow].replace("\n", " - ")

        // Today
        let todayText = widget.addText(severity_tdy);
        todayText.font = Font.boldMonospacedSystemFont(26);
        todayText.centerAlignText()
        todayText.backgroundColor = new Color("00FF00", 1)
        todayText.textColor = this.determineColor(severity_tdy)

        widget.addSpacer()

        // Tomorrow
        let isSplit = severity_tdy.includes("-");
        let tmrText = widget.addText((isSplit ? "Tomorrow: " : "TMR: ") + severity_tmr);
        tmrText.font = Font.boldMonospacedSystemFont(9);
        tmrText.centerAlignText()

        return widget
    }


    async fetchAPI() {
        var log = partial(this.logger, "fetchAPI")

        // let county = args.widgetParameter != null ? args.widgetParameter : "LK Konstanz"
        // Fetch JSON Data
        log("making request")
        let url = "https://opendata.dwd.de/climate_environment/health/alerts/s31fg.json"
        let req = new Request(url);
        let data = await req.loadJSON();

        log("setting options")
        let region = REGION;
        let subregion = SUBREGION;
        let pollenid = POLLEN;

        let regions = data["content"]
        var region_dict = [];

        log("grouping data on region & subregion")
        Array.from(regions).forEach(element => {
            if (region_dict[element.region_name] == null) {
                region_dict[element.region_name] = []
            }
            region_dict[element.region_name][element.partregion_name] = element
        });

        log("validating region & subregion input")
        if ((region_dict[region] == null) || (region_dict[region][subregion] == null)) {
            if (region_dict[region] == null) {
                log("Region is invalid")
            }

            if (region_dict[region][subregion] == null) {
                log("Subegion is invalid")
            }
            return null
        }

        log("Selecting Region & Plant")
        let poldata = region_dict[region][subregion]["Pollen"];
        var pollen = [];
        pollen.today = poldata[pollenid]["today"]
        pollen.tomorrow = poldata[pollenid]["tomorrow"]

        return pollen;
    }

    determineColor(severity) {
        var severity = severity.split("\n").slice(-1);
        if (severity == "HIGH") {
            return Color.red();
        }

        if (severity == "MEDIUM") {
            return Color.yellow();
        }

        return Color.green();
    }

    logger(method, message) {
        console.log("[" + method + "]" + "  " + message)
    }
}

new Pollenflug().run();
