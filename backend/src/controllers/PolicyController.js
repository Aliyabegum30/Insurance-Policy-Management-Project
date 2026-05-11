const policyService = require('../services/PolicyService');
const { policySchema } = require('../validators/policyValidator');

class PolicyController {

  // ======================
  // GET ALL POLICIES
  // ======================

  async getAllPolicies(req, res) {

    try {

      const policies =
        await policyService.getAllPolicies();

      res.status(200).json({
        success: true,
        count: policies.length,
        data: policies
      });

    } catch (error) {

      console.error(
        'Get Policies Error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Failed to fetch policies'
      });
    }
  }

  // ======================
  // GET POLICY STATS
  // ======================

  async getStats(req, res) {

    try {

      const stats =
        await policyService.getPolicyStats();

      res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {

      console.error(
        'Stats Error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Failed to fetch statistics'
      });
    }
  }

  // ======================
  // GET POLICY BY ID
  // ======================

  async getPolicyById(req, res) {

    try {

      const { id } = req.params;

      const policy =
        await policyService.getPolicyById(id);

      if (!policy) {

        return res.status(404).json({
          success: false,
          message: 'Policy not found'
        });
      }

      res.status(200).json({
        success: true,
        data: policy
      });

    } catch (error) {

      console.error(
        'Get Policy Error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Failed to fetch policy'
      });
    }
  }

  // ======================
  // CREATE POLICY
  // ======================

  async createPolicy(req, res) {

    try {

      // Remove empty fields
      const cleanedData = {
        ...req.body
      };

      Object.keys(cleanedData).forEach((key) => {

        if (
          cleanedData[key] === '' ||
          cleanedData[key] === null ||
          cleanedData[key] === undefined
        ) {

          delete cleanedData[key];
        }
      });

      // Remove vehicle fields
      // if not VEHICLE policy
      if (
        cleanedData.type !== 'VEHICLE'
      ) {

        delete cleanedData.vehicleType;
        delete cleanedData.vehicleValue;
      }

      // Remove age if not LIFE
      if (
        cleanedData.type !== 'LIFE'
      ) {

        delete cleanedData.age;
      }

      // Remove health conditions
      // if not HEALTH
      if (
        cleanedData.type !== 'HEALTH'
      ) {

        delete cleanedData.preExistingConditions;
      }

      // Joi Validation
      const { error } =
        policySchema.validate(cleanedData);

      if (error) {

        return res.status(400).json({
          success: false,
          message:
            error.details[0].message
        });
      }

      const policy =
        await policyService.createPolicy(
          cleanedData
        );

      res.status(201).json({
        success: true,
        message:
          'Policy created successfully',
        data: policy
      });

    } catch (error) {

      console.error(
        'Create Policy Error:',
        error
      );

      res.status(400).json({
        success: false,
        message:
          error.message ||
          'Failed to create policy'
      });
    }
  }

  // ======================
  // UPDATE POLICY
  // ======================

  async updatePolicy(req, res) {

    try {

      const { id } = req.params;

      const updatedPolicy =
        await policyService.updatePolicy(
          id,
          req.body
        );

      if (!updatedPolicy) {

        return res.status(404).json({
          success: false,
          message: 'Policy not found'
        });
      }

      res.status(200).json({
        success: true,
        message:
          'Policy updated successfully',
        data: updatedPolicy
      });

    } catch (error) {

      console.error(
        'Update Policy Error:',
        error
      );

      res.status(400).json({
        success: false,
        message:
          error.message ||
          'Failed to update policy'
      });
    }
  }

  // ======================
  // DELETE POLICY
  // ======================

  async deletePolicy(req, res) {

    try {

      const { id } = req.params;

      const deleted =
        await policyService.deletePolicy(id);

      if (!deleted) {

        return res.status(404).json({
          success: false,
          message: 'Policy not found'
        });
      }

      res.status(200).json({
        success: true,
        message:
          'Policy deleted successfully'
      });

    } catch (error) {

      console.error(
        'Delete Policy Error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Failed to delete policy'
      });
    }
  }

  // ======================
  // SEARCH POLICIES
  // ======================

  async searchPolicies(req, res) {

    try {

      const query =
        (
          req.query.query ||
          req.query.q ||
          ''
        ).toLowerCase();

      const policies =
        await policyService.getAllPolicies();

      const filteredPolicies =
        policies.filter((policy) => {

          const holder =
            policy.policyHolder
              ?.toLowerCase?.() || '';

          const number =
            policy.policyNumber
              ?.toLowerCase?.() || '';

          const type =
            policy.type
              ?.toLowerCase?.() || '';

          return (
            holder.includes(query) ||
            number.includes(query) ||
            type.includes(query)
          );
        });

      res.status(200).json({
        success: true,
        count:
          filteredPolicies.length,
        data: filteredPolicies
      });

    } catch (error) {

      console.error(
        'Search Error:',
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          'Search failed'
      });
    }
  }
}

module.exports =
  new PolicyController();