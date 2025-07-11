import { formatCurrency } from '../scripts/utils/money.js';


describe('Test suit:format Currency',()=>{
    it('convert cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    
    it('works with zero',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    
    it('rounds up to the nearest cent',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});