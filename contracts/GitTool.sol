pragma solidity ^0.4.11;

import './lib/AddressUtils.sol';
import './lib/StringUtils.sol';
import './lib/StringArrayUtils.sol';
import './lib/Ownable.sol';

contract GitTool is Ownable {
  using AddressUtils for address;
  using StringUtils for string;
  using StringArrayUtils for string[];

  enum ObjectType { tag, commit, tree, blob }
  struct GitObject {
    ObjectType objectType;
    string ipfsHash;
  }

  struct Repo {
    mapping(address => bool) owners;
    mapping(address => string[]) refNames;
    mapping(string => mapping(address => string)) refs;
    mapping(string => GitObject) objects;
  }

  string[] public repoNames;
  mapping(string => Repo) repos;

  modifier repoExists(string _repoName) {
    require(repoNames.contains(_repoName) && repos[_repoName].owners[msg.sender]);
    _;
  }

  modifier onlyRefOwner(address _refOwner) {
    // TEMPORARY! This allows anyone to push to the contract's remote
    require(_refOwner == msg.sender || _refOwner == address(this));
    // require(_refOwner == msg.sender);
    _;
  }

  function _addRepoOwner(string _repoName, address _repoOwner) private {
    if (!repos[_repoName].owners[_repoOwner]) {
      repos[_repoName].owners[_repoOwner] = true;
    }
  }

  function addRepo(string _repoName) {
    if (!repoNames.contains(_repoName)) {
      repoNames.push(_repoName);
    }

    _addRepoOwner(_repoName, owner);
    _addRepoOwner(_repoName, msg.sender);
  }

  function removeRepo(string _repoName) repoExists(_repoName) {
    repos[_repoName].owners[msg.sender] = false;
  }

  function addObject(string _repoName, string _gitHash, ObjectType _type, string _ipfsHash) repoExists(_repoName) {
    repos[_repoName].objects[_gitHash] = GitObject(_type, _ipfsHash);
  }

  function getObject(string _repoName, string _gitHash) repoExists(_repoName) constant returns (ObjectType, string) {
    GitObject _object = repos[_repoName].objects[_gitHash];
    require(!_object.ipfsHash.equal(""));
    return (_object.objectType, _object.ipfsHash);
  }

  function setRef(string _repoName, address _refOwner, string _refName, string _gitHash) onlyRefOwner(_refOwner) repoExists(_repoName) {
    if (!repos[_repoName].refNames[_refOwner].contains(_refName)) {
      repos[_repoName].refNames[_refOwner].push(_refName);
    }

    repos[_repoName].refs[_refName][_refOwner] = _gitHash;
  }

  function removeRef(string _repoName, address _refOwner, string _refName) onlyRefOwner(_refOwner) repoExists(_repoName) {
    require(repos[_repoName].refNames[_refOwner].contains(_refName));

    repos[_repoName].refNames[_refOwner].remove(_refName);
  }

  function getRef(string _repoName, address _refOwner, uint _index) repoExists(_repoName) constant returns (string, string) {
    string _refName = repos[_repoName].refNames[_refOwner][_index];
    return (_refName, repos[_repoName].refs[_refName][_refOwner]);
  }

  function getRefCount(string _repoName, address _refOwner) repoExists(_repoName) constant returns (uint) {
    return repos[_repoName].refNames[_refOwner].length;
  }

}
