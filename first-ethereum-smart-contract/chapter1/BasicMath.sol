// SPDX-License-Identifier: GPL-3.0
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
    function Add(uint256 x, uint256 y) public view returns (uint256) {
        return x + y;
    }

    /**
     * @dev subtracts two numbers
     * @param x the minuend
     * @param y the subtrahend
     */
    function Sub(uint256 x, uint256 y) public view returns (uint256) {
        return x - y;
    }
}