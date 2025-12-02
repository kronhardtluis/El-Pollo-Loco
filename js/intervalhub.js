export class IntervalHub {
    static allIntervals = [];

    // erstellt aus einer Funktion einen Intervall mit bestimmtem Timer
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
