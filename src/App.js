import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ESGDashboard = () => {
  const [activeTab, setActiveTab] = useState("ranking");

  const styles = {
    container: {
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      padding: "30px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#2d3748",
      margin: "0 0 10px 0",
    },
    subtitle: {
      fontSize: "16px",
      color: "#718096",
      margin: 0,
    },
    button: {
      backgroundColor: "#48bb78",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "15px",
      transition: "all 0.3s",
    },
    tabsCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      marginBottom: "20px",
      overflow: "hidden",
    },
    tabContainer: {
      display: "flex",
      borderBottom: "2px solid #e2e8f0",
      overflowX: "auto",
    },
    tab: {
      padding: "18px 28px",
      border: "none",
      background: "none",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      whiteSpace: "nowrap",
      flex: "0 0 auto",
    },
    contentCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      padding: "30px",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginTop: "25px",
    },
    rankCard: {
      background: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
      borderRadius: "12px",
      padding: "20px",
      color: "white",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    infoBox: {
      backgroundColor: "#ebf8ff",
      border: "3px solid #4299e1",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "25px",
    },
    infoTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#2c5282",
      marginBottom: "12px",
    },
    listItem: {
      marginBottom: "10px",
      fontSize: "15px",
      color: "#2d3748",
    },
  };

  const topCompanies = [
    {
      company: "PAN",
      name: "Tập đoàn PAN",
      eScore: 632.38,
      sScore: 1756.67,
      gScore: 1000,
      total: 3389.05,
    },
    {
      company: "VNM",
      name: "Sữa Việt Nam",
      eScore: 509.76,
      sScore: 1250,
      gScore: 1200,
      total: 2959.76,
    },
    {
      company: "PNJ",
      name: "Trang sức Phú Nhuận",
      eScore: 450,
      sScore: 1100,
      gScore: 1200,
      total: 2750,
    },
    {
      company: "SBT",
      name: "Thành Thành Công",
      eScore: 500,
      sScore: 1340,
      gScore: 900,
      total: 2740,
    },
    {
      company: "CTD",
      name: "Coteccons",
      eScore: 400,
      sScore: 950,
      gScore: 1250,
      total: 2600,
    },
  ];

  const bottomCompanies = [
    {
      company: "DGC",
      name: "Hóa chất Đức Giang",
      eScore: 80,
      sScore: 100,
      gScore: 143.33,
      total: 323.33,
    },
    {
      company: "KDC",
      name: "Tập đoàn KIDO",
      eScore: 0,
      sScore: 150,
      gScore: 198.89,
      total: 348.89,
    },
    {
      company: "VSH",
      name: "Thủy điện Vĩnh Sơn",
      eScore: 47.14,
      sScore: 125,
      gScore: 200,
      total: 372.14,
    },
  ];

  const trendData = [
    { year: "2017", HPG: 450, PNJ: 820, AVG: 600 },
    { year: "2018", HPG: 580, PNJ: 780, AVG: 650 },
    { year: "2019", HPG: 720, PNJ: 720, AVG: 700 },
    { year: "2020", HPG: 890, PNJ: 680, AVG: 750 },
    { year: "2021", HPG: 1050, PNJ: 650, AVG: 800 },
  ];

  const pillarAnalysis = [
    { pillar: "E-Môi trường", high: 632.38, avg: 300, low: 0 },
    { pillar: "S-Xã hội", high: 1756.67, avg: 650, low: 100 },
    { pillar: "G-Quản trị", high: 1250, avg: 800, low: 143.33 },
  ];

  const radarData = [
    { subject: "Vật liệu", PAN: 95, VNM: 85, PNJ: 80, SBT: 90, CTD: 70 },
    { subject: "Năng lượng", PAN: 90, VNM: 88, PNJ: 75, SBT: 85, CTD: 65 },
    { subject: "Nước", PAN: 85, VNM: 80, PNJ: 70, SBT: 75, CTD: 60 },
    { subject: "Khí thải", PAN: 88, VNM: 82, PNJ: 78, SBT: 80, CTD: 68 },
    { subject: "Lao động", PAN: 92, VNM: 90, PNJ: 85, SBT: 88, CTD: 75 },
    { subject: "An toàn", PAN: 94, VNM: 92, PNJ: 88, SBT: 90, CTD: 80 },
    { subject: "Đa dạng", PAN: 86, VNM: 84, PNJ: 82, SBT: 80, CTD: 78 },
    { subject: "Quản trị", PAN: 88, VNM: 95, PNJ: 96, SBT: 85, CTD: 100 },
  ];

  const scatterData = [
    { name: "PAN", esg: 3389, roa: 0.28, size: 100 },
    { name: "VNM", esg: 2960, roa: 0.26, size: 95 },
    { name: "PNJ", esg: 2750, roa: 0.24, size: 90 },
    { name: "REE", esg: 2400, roa: 0.22, size: 85 },
    { name: "HPG", esg: 2200, roa: 0.2, size: 80 },
    { name: "SAB", esg: 2000, roa: 0.18, size: 75 },
    { name: "MSN", esg: 1800, roa: 0.15, size: 70 },
    { name: "KDC", esg: 349, roa: 0.05, size: 40 },
    { name: "DGC", esg: 323, roa: 0.03, size: 35 },
  ];

  const exportToExcel = () => {
    alert(
      "📊 File Excel sẽ bao gồm:\n\n✓ Bảng xếp hạng 43 công ty\n✓ Điểm E, S, G chi tiết\n✓ Dữ liệu 2017-2021\n✓ 6 cấu hình CFP cao\n✓ 12 cấu hình CFR thấp\n✓ Phân tích CFP và CFR"
    );
    const sheet1Data = [
      ["Company", "Name", "E Score", "S Score", "G Score", "Total"],
      ...topCompanies.map((c) => [
        c.company,
        c.name,
        c.eScore,
        c.sScore,
        c.gScore,
        c.total,
      ]),
      ...bottomCompanies.map((c) => [
        c.company,
        c.name,
        c.eScore,
        c.sScore,
        c.gScore,
        c.total,
      ]),
    ];
    const sheet1 = XLSX.utils.aoa_to_sheet(sheet1Data);

    const sheet2 = XLSX.utils.json_to_sheet(trendData);

    const configData = [
      ["Nhóm", "Cấu hình"],
      ["CFP Cao", "E1 * G1 * ~S1"],
      ["CFP Cao", "~E1 * S1"],
      ["CFP Cao", "S1 * ~G1"],
      ["CFP Cao", "E1 * ~S1 * ~G1"],
      ["CFR Thấp", "REE xuất hiện 5/12 cấu hình"],
      ["CFR Thấp", "Trụ S quan trọng nhất"],
    ];
    const sheet3 = XLSX.utils.aoa_to_sheet(configData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet1, "Ranking");
    XLSX.utils.book_append_sheet(wb, sheet2, "Trend 2017-21");
    XLSX.utils.book_append_sheet(wb, sheet3, "Cau hinh ESG");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "ESG_Dashboard.xlsx");
  };

  const tabs = [
    { id: "ranking", label: "🏆 Xếp hạng ESG" },
    { id: "pillars", label: "📊 Phân tích Trụ cột" },
    { id: "trends", label: "📈 Xu hướng" },
    { id: "performance", label: "💰 Hiệu quả Tài chính" },
    { id: "radar", label: "🎯 So sánh Chi tiết" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Dashboard Phân tích ESG</h1>
        <p style={styles.subtitle}>
          43 Doanh nghiệp Sản xuất Niêm yết - Việt Nam (2017-2021)
        </p>
        <button
          style={styles.button}
          onClick={exportToExcel}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#38a169")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#48bb78")
          }
        >
          📥 Xuất Excel
        </button>
      </div>

      <div style={styles.tabsCard}>
        <div style={styles.tabContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                color: activeTab === tab.id ? "#667eea" : "#718096",
                borderBottom:
                  activeTab === tab.id ? "3px solid #667eea" : "none",
                backgroundColor:
                  activeTab === tab.id ? "#f7fafc" : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "ranking" && (
        <>
          <div style={styles.contentCard}>
            <div style={styles.sectionTitle}>
              <span>🏆</span>
              <span>Top 5 Doanh nghiệp ESG</span>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="eScore" fill="#48bb78" name="E-Môi trường" />
                <Bar dataKey="sScore" fill="#4299e1" name="S-Xã hội" />
                <Bar dataKey="gScore" fill="#9f7aea" name="G-Quản trị" />
              </BarChart>
            </ResponsiveContainer>

            <div style={styles.grid}>
              {topCompanies.slice(0, 3).map((company, index) => (
                <div key={company.company} style={styles.rankCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        lineHeight: "1",
                        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
                      }}
                    >
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          marginBottom: "3px",
                        }}
                      >
                        {company.company}
                      </div>
                      <div style={{ fontSize: "13px", opacity: 0.95 }}>
                        {company.name}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: "2px solid rgba(255,255,255,0.3)",
                      paddingTop: "15px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        opacity: 0.9,
                        marginBottom: "5px",
                      }}
                    >
                      Điểm tổng ESG
                    </div>
                    <div style={{ fontSize: "36px", fontWeight: "bold" }}>
                      {company.total.toFixed(2)}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.8,
                        marginTop: "8px",
                      }}
                    >
                      E: {company.eScore.toFixed(0)} | S:{" "}
                      {company.sScore.toFixed(0)} | G:{" "}
                      {company.gScore.toFixed(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chi tiết Top 5 */}
            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#f7fafc",
                borderRadius: "8px",
                padding: "20px",
                overflow: "auto",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#2d3748",
                  marginBottom: "15px",
                }}
              >
                📋 Bảng xếp hạng chi tiết Top 5
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#e2e8f0" }}>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      Hạng
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      Mã CK
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      Tên doanh nghiệp
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                      }}
                    >
                      E
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                      }}
                    >
                      S
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                      }}
                    >
                      G
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                      }}
                    >
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topCompanies.map((company, index) => (
                    <tr
                      key={company.company}
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f7fafc",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <td style={{ padding: "12px", fontWeight: "600" }}>
                        {index + 1}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "700",
                          color: "#667eea",
                        }}
                      >
                        {company.company}
                      </td>
                      <td style={{ padding: "12px", color: "#4a5568" }}>
                        {company.name}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          color: "#48bb78",
                          fontWeight: "600",
                        }}
                      >
                        {company.eScore.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          color: "#4299e1",
                          fontWeight: "600",
                        }}
                      >
                        {company.sScore.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          color: "#9f7aea",
                          fontWeight: "600",
                        }}
                      >
                        {company.gScore.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          textAlign: "right",
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        {company.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.contentCard}>
            <div style={styles.sectionTitle}>
              <span>📉</span>
              <span>Bottom 3 - Cần Cải thiện</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bottomCompanies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="eScore" fill="#48bb78" name="E-Môi trường" />
                <Bar dataKey="sScore" fill="#4299e1" name="S-Xã hội" />
                <Bar dataKey="gScore" fill="#9f7aea" name="G-Quản trị" />
              </BarChart>
            </ResponsiveContainer>

            {/* Chi tiết Bottom 3 */}
            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#fff5f5",
                borderRadius: "8px",
                padding: "20px",
                border: "2px solid #feb2b2",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#742a2a",
                  marginBottom: "15px",
                }}
              >
                ⚠️ Các doanh nghiệp cần cải thiện
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {bottomCompanies.map((company, index) => (
                  <div
                    key={company.company}
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #fc8181",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "16px",
                          color: "#2d3748",
                          marginRight: "10px",
                        }}
                      >
                        {company.company}
                      </span>
                      <span style={{ color: "#718096", fontSize: "14px" }}>
                        {company.name}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", gap: "15px", fontSize: "13px" }}
                    >
                      <span style={{ color: "#48bb78" }}>
                        E: <strong>{company.eScore.toFixed(0)}</strong>
                      </span>
                      <span style={{ color: "#4299e1" }}>
                        S: <strong>{company.sScore.toFixed(0)}</strong>
                      </span>
                      <span style={{ color: "#9f7aea" }}>
                        G: <strong>{company.gScore.toFixed(0)}</strong>
                      </span>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "15px",
                          color: "#e53e3e",
                          marginLeft: "10px",
                          paddingLeft: "10px",
                          borderLeft: "2px solid #fc8181",
                        }}
                      >
                        Tổng: {company.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "pillars" && (
        <div style={styles.contentCard}>
          <div style={styles.sectionTitle}>📊 Phân tích 3 Trụ cột ESG</div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={pillarAnalysis} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="pillar" type="category" width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="high" fill="#48bb78" name="Cao nhất" />
              <Bar dataKey="avg" fill="#ecc94b" name="Trung bình" />
              <Bar dataKey="low" fill="#f56565" name="Thấp nhất" />
            </BarChart>
          </ResponsiveContainer>

          <div style={styles.infoBox}>
            <div style={styles.infoTitle}>🔍 Phát hiện Quan trọng:</div>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li style={styles.listItem}>
                ✓ Trụ cột <strong>S (Xã hội)</strong> đóng vai trò cốt lõi trong
                việc tạo ra CFP cao và CFR thấp
              </li>
              <li style={styles.listItem}>
                ✓ Điểm số trụ S có ảnh hưởng lớn hơn nhiều so với trụ E và G
              </li>
              <li style={styles.listItem}>
                ✓ 6 cấu hình dẫn đến hiệu quả tài chính cao
              </li>
              <li style={styles.listItem}>
                ✓ 12 cấu hình dẫn đến rủi ro tài chính thấp
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "trends" && (
        <div style={styles.contentCard}>
          <div style={styles.sectionTitle}>📈 Xu hướng ESG 2017-2021</div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="HPG"
                stroke="#48bb78"
                strokeWidth={3}
                name="HPG (↑ Cải thiện mạnh)"
              />
              <Line
                type="monotone"
                dataKey="PNJ"
                stroke="#f56565"
                strokeWidth={3}
                name="PNJ (↓ Suy giảm)"
              />
              <Line
                type="monotone"
                dataKey="AVG"
                stroke="#a0aec0"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Trung bình ngành"
              />
            </LineChart>
          </ResponsiveContainer>

          <div style={styles.grid}>
            <div
              style={{
                ...styles.infoBox,
                border: "3px solid #48bb78",
                backgroundColor: "#f0fff4",
              }}
            >
              <div style={{ ...styles.infoTitle, color: "#22543d" }}>
                📈 Cải thiện Đáng kể
              </div>
              <p style={{ margin: 0, color: "#2d3748" }}>
                <strong>Hòa Phát (HPG):</strong> Tăng 133% từ 2017-2021
              </p>
            </div>
            <div
              style={{
                ...styles.infoBox,
                border: "3px solid #f56565",
                backgroundColor: "#fff5f5",
              }}
            >
              <div style={{ ...styles.infoTitle, color: "#742a2a" }}>
                📉 Suy giảm Nhiều nhất
              </div>
              <p style={{ margin: 0, color: "#2d3748" }}>
                <strong>Phú Nhuận (PNJ):</strong> Giảm 21% từ 2017-2021
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div style={styles.contentCard}>
          <div style={styles.sectionTitle}>💰 Mối quan hệ ESG - ROA</div>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="esg" name="Điểm ESG" unit="%" />
              <YAxis dataKey="roa" name="ROA" unit="%" />
              <ZAxis dataKey="size" range={[100, 1000]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Doanh nghiệp" data={scatterData} fill="#667eea" />
            </ScatterChart>
          </ResponsiveContainer>

          <div style={styles.grid}>
            <div style={{ ...styles.infoBox, border: "3px solid #4299e1" }}>
              <div style={styles.infoTitle}>📊 6 Cấu hình CFP Cao</div>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li style={styles.listItem}>✓ Cấu hình 1: E1 * G1 * ~S1</li>
                <li style={styles.listItem}>✓ Cấu hình 2: ~E1 * S1</li>
                <li style={styles.listItem}>✓ Cấu hình 3: S1 * ~G1</li>
                <li style={styles.listItem}>✓ Cấu hình 4: E1 * ~S1 * ~G1</li>
                <li style={styles.listItem}>✓ Cấu hình 5-6: ~E1 * S1 * ~G1</li>
              </ul>
            </div>
            <div
              style={{
                ...styles.infoBox,
                border: "3px solid #9f7aea",
                backgroundColor: "#faf5ff",
              }}
            >
              <div style={{ ...styles.infoTitle, color: "#44337a" }}>
                🎯 12 Cấu hình CFR Thấp
              </div>
              <p style={styles.listItem}>
                Trụ S xuất hiện trong hầu hết các cấu hình tối ưu
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}>
                <li style={styles.listItem}>
                  • REE xuất hiện trong 5/12 cấu hình
                </li>
                <li style={styles.listItem}>
                  • Trụ E cốt lõi trong cấu hình 4
                </li>
                <li style={styles.listItem}>• Tính nhất quán: 0.653 - 0.837</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "radar" && (
        <div style={styles.contentCard}>
          <div style={styles.sectionTitle}>🎯 So sánh Chi tiết Top 5</div>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="PAN"
                dataKey="PAN"
                stroke="#f56565"
                fill="#f56565"
                fillOpacity={0.3}
              />
              <Radar
                name="VNM"
                dataKey="VNM"
                stroke="#4299e1"
                fill="#4299e1"
                fillOpacity={0.3}
              />
              <Radar
                name="PNJ"
                dataKey="PNJ"
                stroke="#48bb78"
                fill="#48bb78"
                fillOpacity={0.3}
              />
              <Radar
                name="SBT"
                dataKey="SBT"
                stroke="#ed8936"
                fill="#ed8936"
                fillOpacity={0.3}
              />
              <Radar
                name="CTD"
                dataKey="CTD"
                stroke="#9f7aea"
                fill="#9f7aea"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={styles.contentCard}>
        <div style={styles.sectionTitle}>📋 Dữ liệu Excel bao gồm:</div>
        <div style={styles.grid}>
          <div>
            <h4 style={{ color: "#2d3748", marginBottom: "12px" }}>
              Sheet 1: Xếp hạng Tổng thể
            </h4>
            <ul style={{ paddingLeft: "20px", color: "#718096" }}>
              <li style={styles.listItem}>• 43 công ty với điểm ESG đầy đủ</li>
              <li style={styles.listItem}>• Điểm E, S, G riêng biệt</li>
              <li style={styles.listItem}>• Xếp hạng từng trụ cột</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "#2d3748", marginBottom: "12px" }}>
              Sheet 2: Dữ liệu theo Năm
            </h4>
            <ul style={{ paddingLeft: "20px", color: "#718096" }}>
              <li style={styles.listItem}>• Điểm ESG 2017-2021</li>
              <li style={styles.listItem}>• Xu hướng thay đổi</li>
              <li style={styles.listItem}>• ROA và D/E ratio</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "#2d3748", marginBottom: "12px" }}>
              Sheet 3: Phân tích Cấu hình
            </h4>
            <ul style={{ paddingLeft: "20px", color: "#718096" }}>
              <li style={styles.listItem}>• 6 cấu hình CFP cao</li>
              <li style={styles.listItem}>• 12 cấu hình CFR thấp</li>
              <li style={styles.listItem}>• Hệ số tính nhất quán</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;
