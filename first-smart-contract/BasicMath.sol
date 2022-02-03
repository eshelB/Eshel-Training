// this will be deployed with remix
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title BasicMath
 * @dev Store & retrieve value in a variable
 */
contract BasicMath {
    /**
     * @dev adds two numbers
     * @param x the augend
     * @param y the addend
     */
    function Add(int256 x, int256 y) public view returns (uint256) {
        return x + y;
    }

    /**
     * @dev subtracts two numbers
     * @param x the minuend
     * @param y the subtrahend
     */
    function Sub(int256 x, int256 y) public view returns (uint256) {
        return x - y;
    }

    /**
     * @dev multiplies two numbers
     * @param x the multiplicand
     * @param y the multiplier
     */
    function Mul(int256 x, int256 y) public view returns (uint256) {
        return x - y;
    }

    /**
     * @dev divides two numbers, result is rounded down
     * @param x the dividend
     * @param y the divisor
     */
    function Div(int256 x, int256 y) public view returns (uint256) {
        return x / y;
    }
}
