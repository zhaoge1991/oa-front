import {Pipe, PipeTransform} from '@angular/core';
const ChineseNumbeMap = {
        0: '零',
        1: '壹',
        2: '贰',
        3: '叁',
        4: '肆',
        5: '伍',
        6: '陆',
        7: '柒',
        8: '捌',
        9: '玖'
    }
    
@Pipe({
    name: 'amountOfCapitalPipe'
})
export class amountOfCapitalPipe implements PipeTransform {
    transform(value: number) {
        return this.ChineseCurrencyFormatter(value);
    }

    getChineseFromNumber(num:number) {
        let intNumber = Math.floor(num);
        return ChineseNumbeMap[intNumber];
    }

    // 格式化 千 的数据，单独出来，因为单位多数以此分隔
    formatThousand(thousandData:number) {
        let thousandStr = ''
        let houndredStr = ''
        let tenStr = ''
        let numStr = ''

        let thousand = 0
        let hundred = 0
        let ten = 0
        let num = 0

        thousand = Math.floor(thousandData/1000);
        
        
        // 当超过一千时，进行千位的处理
        if (thousand >= 1) {
            thousandStr = this.getChineseFromNumber(thousand) + '仟'
            thousandData = thousandData - (thousand * 1000)
            
        }

        hundred = Math.floor(thousandData/100)
        if (hundred >= 1) {
            thousandData = thousandData - (hundred * 100)
        }

        ten = Math.floor(thousandData/10)

        num = Math.floor(thousandData % 10)

        if (hundred < 1 && ten < 1 && num === 0) {
            hundred = ten = num = 0
        } else {

            houndredStr = hundred < 1 ? '零' : this.getChineseFromNumber(hundred) + '佰'
            tenStr = ten < 1 ? '零' : this.getChineseFromNumber(ten) + '拾'
            numStr = num < 1 ? '' : this.getChineseFromNumber(num)
        }

        let formattedStr = thousandStr + houndredStr + tenStr + numStr

        // 针对1001这种，要转换两个连续的零为一个零;如果第一个值为零，删除;如果最后为0，比如 两百零，也去除
        formattedStr = formattedStr.replace(/零零/, '零').replace(/^零/, '').replace(/零$/, '')

        return formattedStr
    }

    formatDecimal(decimalStr) {
        const newFloat = parseFloat(parseFloat(decimalStr).toFixed(2))
        // 先将小数乘以一百
        const plussedDecimal = newFloat * 100
        let tenPercentStr = '' // 角
        let percentStr = '' // 分

        const tenPercent = plussedDecimal / 10
        const percent = plussedDecimal % 10

        tenPercentStr = tenPercent >= 1 ? this.getChineseFromNumber(tenPercent) + '角' : '零角'
        percentStr = percent >= 1 ? this.getChineseFromNumber(percent) + '分' : ''

        return tenPercentStr + percentStr
    }

    formatCurrency(originNumber:number) {
        const numberString = '' + originNumber
        let decimalStr = ''
        let fullIntegerStr = ''

        let hundredMillionStr = '' // 亿的中文值
        let tenThousandStr = '' // 万的中文值
        let intNumberStr = '' // 整数位的中文值
        
        const pointerIndex = numberString.indexOf('.')

        if (pointerIndex > 0) {
            decimalStr = numberString.substr(pointerIndex)
            fullIntegerStr = numberString.substr(0, pointerIndex)
        } else {
            fullIntegerStr = numberString
        }
        
        // 计算亿的部分
        let hundredMillion = 0
        hundredMillion = Math.floor(originNumber / 100000000)
        // 注意，1/1000000000，当执行parseInt的时候，是以指数 1+e-10来标识的，parseInt后仍然是1
        if (hundredMillion >= 1 && originNumber >= 100000000) {
            if (hundredMillion > 9999) {
                return '数额过大'
            }
            hundredMillionStr = this.formatThousand(hundredMillion)

            originNumber = originNumber - (hundredMillion * 100000000)
        }

        // 计算万的部分
        const tenThousand = Math.floor(originNumber / 10000)
        if (tenThousand >= 1) {
            tenThousandStr = this.formatThousand(tenThousand)
            originNumber = originNumber - (tenThousand * 10000)
        }
        

        // 形如 一亿零九百万，或十亿零两千万这种结构, 在相应单位上面，都相差10及以上
        if ((hundredMillion >= 10 && hundredMillion % 10 === 0) ||
            (hundredMillion >= 1 && tenThousand < 1000 && tenThousand !== 0)) {
            tenThousandStr = '零' + tenThousandStr
        }

        const intNumber = originNumber
        
        
        
        intNumberStr = this.formatThousand(intNumber)

        hundredMillionStr = hundredMillionStr ? hundredMillionStr + '亿' : ''
        tenThousandStr = tenThousandStr ? tenThousandStr + '万' : ''

        // 形如 一万零六百 这种结构的数据,壹拾万零六千
        if ((tenThousand >= 10 && tenThousand % 10 === 0) ||
            (tenThousand >= 1 && intNumber < 1000 && intNumber !== 0)) {
            intNumberStr = '零' + intNumberStr
        }
        
        
        fullIntegerStr = hundredMillionStr + tenThousandStr + intNumberStr
        
       
        
        fullIntegerStr = fullIntegerStr ? fullIntegerStr + '圆' : ''

        if (decimalStr) {
            decimalStr = this.formatDecimal(decimalStr)
        } else {
            fullIntegerStr = fullIntegerStr ? fullIntegerStr + '整' : '零圆整'
        }

        return fullIntegerStr + decimalStr
    }

    ChineseCurrencyFormatter(passedInData) {
        const type = typeof passedInData
        if (type === 'undefined') {
            return '无效金额'
        }
        const numberToFormat = parseFloat(passedInData)
        return this.formatCurrency(numberToFormat)
    }

}
