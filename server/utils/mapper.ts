import _ from "lodash";
import { Statistics } from "../types/Statistics";

export const statisticMapper = (statistics:any, qNumber:any) => {

    const mappedStatistics: any = {};
    let finalSexStatistics: any[] = []
    let finalGroupAge:any[] = []
    let finalUrbanism:any[] = []
    let finalOcupation:any[] = []
    _.forEach(_.get(statistics[0],'Sex'), sexStatistics => {
        const partialStatistics:any = {};
        _.set(partialStatistics,_.get(sexStatistics,'_id'),_.get(sexStatistics,'count')/qNumber)
        finalSexStatistics.push(partialStatistics)
              
    })
    _.forEach(_.get(statistics[0],'GroupAge'), groupStatistics => {
        console.log(groupStatistics)
        const partialStatistics:any = {};
        _.set(partialStatistics,_.get(groupStatistics,'_id'),_.get(groupStatistics,'count')/qNumber)
        finalGroupAge.push(partialStatistics)
              
    })
    _.forEach(_.get(statistics[0],'Urbanism'), urbanismStatistics => {
        const partialStatistics:any = {};
        _.set(partialStatistics,_.get(urbanismStatistics,'_id'),_.get(urbanismStatistics,'count')/qNumber)
        finalUrbanism.push(partialStatistics)
              
    })
    _.forEach(_.get(statistics[0],'Occupation'), occupationStatistics => {

        const partialStatistics:any = {};
        _.set(partialStatistics,_.get(occupationStatistics,'_id'),_.get(occupationStatistics,'count')/qNumber)
        finalOcupation.push(partialStatistics)
              
    })
    mappedStatistics['Sex'] = finalSexStatistics; 
    mappedStatistics['GroupAge'] = finalGroupAge;
    mappedStatistics['Urbanism'] = finalUrbanism;
    mappedStatistics['Occupation'] = finalOcupation;
    return mappedStatistics
}

 