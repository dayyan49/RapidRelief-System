import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Button from "../../components/common/Button.jsx";
import Modal from "../../components/common/Modal.jsx";
import {
  getInventory,
  getInventorySummary,
  createResource,
  updateResource,
  deleteResource,
} from "../../api/inventory.api.js";

const RESOURCE_TYPES = ["AMBULANCE", "MEDICAL_KIT", "FOOD_PACKET", "RESCUE_TEAM"];
const EMPTY_FORM = { name: "", type: "AMBULANCE", quantity: 0, available: 0, status: "AVAILABLE", notes: "" };

const AdminInventory = () => {
  const [resources, setResources] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchData = async () => {
    try {
      const [inv, sum] = await Promise.all([getInventory(), getInventorySummary()]);
      setResources(inv.resources || []);
      setSummary(sum.summary || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (r) => {
    setEditing(r);
    setForm({
      name: r.name,
      type: r.type,
      quantity: r.quantity,
      available: r.available,
      status: r.status,
      notes: r.notes || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateResource(editing._id, form);
      } else {
        await createResource({ ...form, available: form.available || form.quantity });
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResource(id);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const summaryCards = RESOURCE_TYPES.map((type) => ({
    type,
    total: summary[type]?.total || 0,
    available: summary[type]?.available || 0,
  }));

  return (
    <DashboardLayout title="Resource Inventory" subtitle="Manage ambulances, medical kits, food packets, and rescue teams">
      <div className="max-w-6xl">
        <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus size={16} /> Add Resource
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((s) => (
            <div key={s.type} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-teal-400" />
                <p className="text-slate-400 text-xs">{s.type.replace("_", " ")}</p>
              </div>
              <p className="text-2xl font-bold text-white">{s.available}</p>
              <p className="text-xs text-slate-500">of {s.total} available</p>
            </div>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-white/10">
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-left py-3 px-2">Qty</th>
                  <th className="text-left py-3 px-2">Available</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-2">{r.name}</td>
                    <td className="py-3 px-2">{r.type.replace("_", " ")}</td>
                    <td className="py-3 px-2">{r.quantity}</td>
                    <td className="py-3 px-2">{r.available}</td>
                    <td className="py-3 px-2">{r.status}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(r)} className="text-teal-400 hover:text-teal-300">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(r._id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Resource" : "Add Resource"}>
          <form onSubmit={handleSave} className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Resource name"
              required
              className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number" min="0"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                placeholder="Total quantity"
                required
                className="h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
              />
              <input
                type="number" min="0"
                value={form.available}
                onChange={(e) => setForm({ ...form, available: Number(e.target.value) })}
                placeholder="Available"
                className="h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              <option value="AVAILABLE">Available</option>
              <option value="DEPLOYED">Deployed</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Notes (optional)"
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white resize-none"
            />
            <Button type="submit" className="w-full">{editing ? "Update" : "Create"}</Button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default AdminInventory;
