async function getInputData(filename: string): Promise<[number[], number[]]> {
    const text = await Deno.readTextFile(filename);
    const list1 : number[] = [], list2: number [] = [];

    for(const row of text.split('\n')){
        const [ e1, e2 ] = row.split('   ');
        list1.push(parseInt(e1));
        list2.push(parseInt(e2));
    }

    return [list1, list2];
}

function distanceBetweenLists(list1: number[], list2: number[]): number {
    const l1_sorted = list1.sort((a, b) => a-b);
    const l2_sorted = list2.sort((a, b) => a-b);

    let sum = 0;
    for(let i = 0; i < l1_sorted.length; i++){
        sum += Math.abs(l1_sorted[i] - l2_sorted[i]);
    }

    return sum;
}

function similarityScoreBetweenLists(list1: number[], list2: number[]): number {

    const counterList2 = countElements(list2);
    const result = list1.reduce((acc, current) => acc + (counterList2.has(current) ? current * counterList2.get(current)! : 0), 0);
    return result;
}

function countElements(list: number[]): Map<number, number>{
    const res = new Map<number, number>();
    list.forEach(e => res.set(e, res.has(e) ? res.get(e)! + 1 : 1));
    return res;
}


const [l1, l2] = await getInputData('./day1/data.txt');
console.log("Distance between lists is: " + distanceBetweenLists(l1, l2));
console.log("Similarity Score is: ", similarityScoreBetweenLists(l1, l2));