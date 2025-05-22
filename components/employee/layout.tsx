import type React from "react"
import { Layout } from "antd"
import EmployeeSidebar from "./sidebar"
import EmployeeHeader from "./header"

const { Content } = Layout

interface EmployeeLayoutProps {
  children: React.ReactNode
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <EmployeeSidebar />
      <Layout className="site-layout">
        <EmployeeHeader />
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default EmployeeLayout
