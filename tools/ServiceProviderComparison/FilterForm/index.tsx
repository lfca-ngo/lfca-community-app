import { Col, Form, FormProps, Row, Select } from 'antd'

import { MultiSelect } from '../../../components/MultiSelect'
import { ServiceProviderFragment } from '../../../services/lfca-backend'
import { getUniqueTags, PRICE_FILTER_OPTIONS } from '../utils'

const { Option } = Select

export interface FilterFormItems {
  services?: string[]
  supplyChainComplexity?: string[]
  models?: string[]
  cost?: number[][]
}

interface FilterFormProps {
  form: FormProps['form']
  onValuesChange: (_: FilterFormItems, allValues: FilterFormItems) => void
  providers: ServiceProviderFragment[]
}

export const FilterForm = ({
  form,
  onValuesChange,
  providers,
}: FilterFormProps) => {
  const serviceOptions = getUniqueTags(providers, 'services')
  const modelOptions = getUniqueTags(providers, 'model')
  const supplyChainComplexityOptions = getUniqueTags(
    providers,
    'supplyChainComplexity'
  )

  return (
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Services" name="services">
            <Select
              mode="multiple"
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {serviceOptions.map((service) => (
                <Option key={service.name}>{service.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Model" name="models">
            <MultiSelect
              options={modelOptions.map((m) => ({
                key: m.name as string,
                label: m.name as string,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Budget" name="cost">
            <MultiSelect mode="single" options={PRICE_FILTER_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Supply chain" name="supplyChainComplexity">
            <MultiSelect
              mode="single"
              options={supplyChainComplexityOptions.map((m) => ({
                key: m.name as string,
                label: m.name as string,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
