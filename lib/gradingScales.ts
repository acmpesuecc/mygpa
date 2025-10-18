export interface Grade{
    grade:string;
    points:number;
}
export const gradeScales: { [key: string]:Grade[]} = {
    '10.0':[
        {grade: 'S', points: 10},
        {grade: 'A', points: 9},
        {grade: 'B', points: 8},
        {grade: 'C', points: 7},
        {grade: 'D', points: 6},
        {grade: 'E', points: 5},
        {grade: 'F', points: 0},
    ],
    '4.0':[
        {grade: 'A', points: 4.0},
        {grade: 'A-', points: 3.7},
        {grade: 'B+', points: 3.3},
        {grade: 'B', points: 3.0},
        {grade: 'B-', points: 2.7},
        {grade: 'C+', points: 2.3},
        {grade: 'C', points:2.0},
        {grade: 'D', points:1.0},
        {grade: 'F', points: 0.0},
    ],
       '5.0':[
        {grade: 'A+', points: 5.0},
        {grade: 'A', points: 5.0},
        {grade: 'A-', points: 4.5},
        {grade: 'B+', points: 4.0},
        {grade: 'B', points: 3.5},
        {grade: 'B-', points: 3.0},
        {grade: 'C+', points:2.5},
        {grade: 'C', points: 2.0}, 
         {grade: 'D+', points: 1.5},
          {grade: 'D', points:1.0},
        {grade: 'F', points: 0.0},
    ],
    '4.33': [
    { grade: 'A+', points: 4.33 },
    { grade: 'A', points: 4.00 },
    { grade: 'A-', points: 3.67 },
    { grade: 'B+', points: 3.33 },
    { grade: 'B', points: 3.00 },
    { grade: 'B-', points: 2.67 },
    { grade: 'C+', points: 2.33 },
    { grade: 'C', points: 2.00 },
    { grade: 'D', points: 1.00 },
    { grade: 'F', points: 0.00 },
  ],
};

