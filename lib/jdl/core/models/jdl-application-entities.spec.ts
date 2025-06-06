/**
 * Copyright 2013-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { before, describe, it } from 'esmocha';
import { expect } from 'chai';
import JDLApplicationEntities from '../models/jdl-application-entities.js';

describe('jdl - JDLApplicationEntities', () => {
  describe('addEntityNames', () => {
    describe('when not passing anything', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities();
      });

      it('should fail', () => {
        expect(() => jdlApplicationEntities.add()).to.throw(/^An entity name has to be passed so as to be added\.$/);
      });
    });
    describe('when passing an entity name', () => {
      describe('that is already present', () => {
        let jdlApplicationEntities;

        before(() => {
          jdlApplicationEntities = new JDLApplicationEntities(['A']);
          jdlApplicationEntities.add('A');
        });

        it('should not add it', () => {
          expect(jdlApplicationEntities.size()).to.equal(1);
        });
      });
      describe('that is not already present', () => {
        let jdlApplicationEntities;

        before(() => {
          jdlApplicationEntities = new JDLApplicationEntities(['A']);
          jdlApplicationEntities.add('B');
        });

        it('should add it', () => {
          expect(jdlApplicationEntities.size()).to.equal(2);
        });
      });
    });
  });
  describe('addEntityNames', () => {
    describe('when not passing anything', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A']);
        jdlApplicationEntities.addEntityNames();
      });

      it('should not alter the state', () => {
        expect(jdlApplicationEntities.size()).to.equal(1);
      });
    });
    describe('when passing a falsy name', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A']);
        jdlApplicationEntities.addEntityNames([undefined, null]);
      });

      it('should not alter the state', () => {
        expect(jdlApplicationEntities.size()).to.equal(1);
      });
    });
    describe('when passing entity names', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A']);
        jdlApplicationEntities.addEntityNames(['A', 'B', 'C']);
      });

      it('should alter the state without duplicates', () => {
        expect(jdlApplicationEntities.size()).to.equal(3);
      });
    });
  });
  describe('forEach', () => {
    describe('when not passing a function', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities();
      });

      it('should not fail', () => {
        expect(() => jdlApplicationEntities.forEach()).not.to.throw();
      });
    });
    describe('when passing a function', () => {
      let result;

      before(() => {
        const jdlApplicationEntities = new JDLApplicationEntities(['A', 'B']);
        result = [];
        jdlApplicationEntities.forEach(entityName => result.push(entityName));
        result = result.join(', ');
      });

      it('should iterate over the entities', () => {
        expect(result).to.equal('A, B');
      });
    });
  });
  describe('toArray', () => {
    describe('when there is no entity', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities();
      });

      it('should return an empty list', () => {
        expect(jdlApplicationEntities.toArray()).to.deep.equal([]);
      });
    });
    describe('when there are entities', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A', 'B']);
      });

      it('should return 2', () => {
        expect(jdlApplicationEntities.toArray()).to.deep.equal(['A', 'B']);
      });
    });
  });
  describe('size', () => {
    describe('when there is no entity', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities();
      });

      it('should return 0', () => {
        expect(jdlApplicationEntities.size()).to.equal(0);
      });
    });
    describe('when there are entities', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A', 'B']);
      });

      it('should return 2', () => {
        expect(jdlApplicationEntities.size()).to.equal(2);
      });
    });
  });
  describe('toString', () => {
    describe('when there is no entity', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities();
      });

      it('should return an empty string', () => {
        expect(jdlApplicationEntities.toString()).to.equal('');
      });
    });
    describe('when there is an entity', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A']);
      });

      it('should return it', () => {
        expect(jdlApplicationEntities.toString()).to.equal('entities A');
      });
    });
    describe('when there are entities', () => {
      let jdlApplicationEntities;

      before(() => {
        jdlApplicationEntities = new JDLApplicationEntities(['A', 'B']);
      });

      it('should return them separated', () => {
        expect(jdlApplicationEntities.toString()).to.equal('entities A, B');
      });
    });
  });
});
