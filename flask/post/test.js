



var MacroExecutor = {
    sdk: null, initSDK: function (scripts) { this.sdk = {}; for (var i in scripts) { var script = scripts[i]; eval(script); if (typeof result !== 'undefined') { for (var key in result) { this.sdk[key] = result[key] } } } }, run: function (macro, script, args) {
        var sdk = this.sdk; for (var x in this.sdk) { eval('var ' + x + ' = sdk["' + x + '"]'); }
        if (macro && macro.getCommon) {
            var common = macro.getCommon()
            for (var c in common) { eval('var ' + c + ' = common["' + c + '"]'); }
        }
        eval(script)
        main.apply(null, args)
    }
}

{
    "filterValues": "okk"
}

{
    "stringHeaders": [
        "统计日期"
    ],
    "stringHeaderNames": null,
    "data": [
        [
            {
                "type": "STRING",
                "displayValue": "2020-Q1",
                "value": "2020-Q1",
                "useTransformRule": false,
                "uniqueId": null,
                "null": false
            },
            {
                "type": "STRING",
                "displayValue": "2020-Q1",
                "value": "2020-Q1",
                "useTransformRule": false,
                "uniqueId": null,
                "null": false
            }
        ],
        [
            {
                "type": "STRING",
                "displayValue": "2020-Q2",
                "value": "2020-Q2",
                "useTransformRule": false,
                "uniqueId": null,
                "null": false
            },
            {
                "type": "STRING",
                "displayValue": "2020-Q2",
                "value": "2020-Q2",
                "useTransformRule": false,
                "uniqueId": null,
                "null": false
            }
        ]
    ],
    "mappedColumnIndexes": {},
    "mappedColumns": {},
    "totalRowsCount": 15,
    "columnsCount": 2,
    "rowsCount": 2
}
32E656FF17AA82D35C020D6E896FCC84